module.exports = new Vue({
    data: {
        id: null,
        name: null,
        day: {
            value: 2,
            options: [
                {
                    text: "Lunes",
                    value: 2
                },
                {
                    text: "Martes",
                    value: 3
                },
                {
                    text: "Miércoles",
                    value: 4
                },
                {
                    text: "Jueves",
                    value: 5
                },
                {
                    text: "Viernes",
                    value: 6
                },
                {
                    text: "Sábado",
                    value: 7
                },
                {
                    text: "Domingo",
                    value: 1
                }
            ]
        },
        begin: {
            value: null,
            text: "hh:mm:ss"
        },
        end: {
            value: null,
            text: "hh:mm:ss"
        },
        models: {
            ruta: null,
            rutaPunto: null,
            rutaPuntoServicio: null,
            sucursal: null,
            sucursalHorario: null,
            sucursalCliente: null
        },
        map: {
            main: null,
            geocoder: null,
            distanceMatrix: null,
            directionService: null,
            data: {
                address: "Ciudad de México, México",
                zoom: 13
            }
        },
        store: {
            data: {
                totalDistance: null,
                totalTime: null
            },
            point: [],
            see: {
                scheduleBegin: null,
                scheduleEnd: null,
                client: [],
                start: null,
                travel: null,
                death: null,
                service: null,
                finish: null
                
            }
        }
    },
    methods: {
        init: function(type, first){
            var me = this, i;
            if(type === "modal" && !first){
                for(i = 0; i < this.store.point.length; i++){
                    if(this.store.point[i].main !== null)
                        this.store.point[i].main.setMap(null);
                    if(this.store.point[i].renderer !== null)
                        this.store.point[i].renderer.setMap(null);
                }
            }
            this.store.point = [];
            this.store.data.totalDistance = 0;
            this.models.ruta.get({
                delimiters: this.id
            },
            function(success){
                me.name = success.body.nombre;
                me.begin.value = success.body.hora_inicio;
                me.end.value = success.body.hora_fin;
                me.day.value = success.body.dia;
                me.store.data.totalTime = me.converter("string", me.converter("time", success.body.hora_fin) - me.converter("time", success.body.hora_inicio));
                if(type === "modal"){
                    setTimeout(function(){
                        me.initMap(type, first);
                    }, 250);
                }
                else
                    me.initMap(type, first);
            },
            function(error){
                console.log(error);
            });
        },
        initMap: function(type, first){
            if(type !== "modal" || (type === "modal" && first))
                this.map.main = new google.maps.Map(document.getElementById('mapSeeRoute'), {     //Define Map
                    zoom: this.map.data.zoom
                });
            if(type !== "modal" || first){
                this.initFocus();
                this.initServices();
            }
            this.initPoint();
        },
        initFocus: function(){
            this.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionSeeRoute'));
        },
        initServices: function(){
            this.map.distanceMatrix = new google.maps.DistanceMatrixService();
            this.map.directionService = new google.maps.DirectionsService();
        },
        initGeocoder: function(){
            var me = this;
            this.map.geocoder = new google.maps.Geocoder();      //Geocoder for fisrt position
            this.map.geocoder.geocode({                          //Geocoder for placing
                address: this.map.data.address
            },
            function(response, status){
                if(status === "OK")
                    me.map.main.setCenter(response[0].geometry.location);
                else
                    console.log(status);
            });
        },
        initPoint: function(){
            var me = this, length;
            this.models.rutaPunto.get({
                delimiters: this.id,
                params: {
                    "per-page": 100,
                    "sort": "hora_llegada_estimada",
                    "expand": "sucursal"
                }
            },
            function(success){
                for(i = 0; i < success.body.length; i++){
                    length = me.store.point.length;
                    me.store.point.push({
                        id: success.body[i].id,
                        idStore: success.body[i]._embedded.sucursal.id,
                        lat: success.body[i]._embedded.sucursal.lat,
                        lng: success.body[i]._embedded.sucursal.lng,
                        name: success.body[i]._embedded.sucursal.nombre,
                        schedule: [],
                        scheduleIndex: null,
                        arrival: success.body[i].hora_llegada_estimada,
                        calculate: true,       //false takes api values, true takes inherit operations
                        travel: length === 0 ? "00:00:00" : null,
                        distance: length === 0 ? 0 : null,
                        start: length === 0 ? me.begin.value : null,
                        death: length === 0 ? me.converter("string", me.converter("time", success.body[i].hora_llegada_estimada) - me.converter("time", me.begin.value)) : null,
                        usedTime: null,
                        client: [],
                        hidden: true,
                        renderer: null,
                        details: {
                            warnings: null,
                            copyrights: [],
                            legs: []
                        },
                        main: new google.maps.Marker({
                            map: me.map.main,
                            position: {
                                lat: success.body[i]._embedded.sucursal.lat,
                                lng: success.body[i]._embedded.sucursal.lng
                            },
                            icon: {
                                url: "/image/maps/green-empty.png",
                                labelOrigin: new google.maps.Point(11, 11)
                            },
                            label: "" + (length + 1) + "",
                            title: success.body[i]._embedded.sucursal.nombre,
                        }),
                        window: new google.maps.InfoWindow({
                            content: "Dirección no encontrada.",
                            maxWidth: 175,
                            flag: false
                        })
                    });
                    me.initClient(success.body[i].id, length);
                    me.getDirection(length);
                }
                me.focusPosition();
            },
            function(error){
                console.log(error);
            });
        },
        initClient: function(pointId, i){
            var j, k, me = this, usedTime = 0;
            this.models.sucursalCliente.get({
                delimiters: this.store.point[i].idStore,
                params: {
                    "per-page": 100,
                    "expand": "cliente"
                }
            },
            function(success){
                for(j = 0; j < success.body.length; j++){
                    me.store.point[i].client.push({
                        id: success.body[j]._embedded.cliente.id,
                        name: success.body[j]._embedded.cliente.nombre,
                        time: success.body[j].tiempo_solicitado,
                        active: false
                    });
                }
                me.models.rutaPuntoServicio.get({
                    delimiters: [me.id, pointId],
                    params: {
                        "per-page": 100
                    }
                },
                function(success2){
                    for(j = 0; j < success2.body.length; j++)
                        for(k = 0; k < me.store.point[i].client.length; k++)
                            if(success2.body[j].cliente_id === me.store.point[i].client[k].id){
                                me.store.point[i].client[k].active = true;
                                usedTime += me.converter("time", me.store.point[i].client[k].time);
                            }
                    me.store.point[i].usedTime = me.converter("string", usedTime);
                    if(i < me.store.point.length - 1)
                        me.store.point[i + 1].start = me.converter("string", usedTime + me.converter("time", me.store.point[i].arrival));
                    me.initSchedule(i);
                },
                function(error2){
                    console.log(error2);
                });
            },
            function(error){
                console.log(error);
            });
        },
        initSchedule: function(i){
            var j,
                me = this;
            this.models.sucursalHorario.get({
                delimiters: this.store.point[i].idStore,
                params: {
                    "per-page": 100,
                    "expand": "cliente",
                    "sort": "hora_inicio"
                }
            },
            function(success){
                for(j = 0; j < success.body.length; j++)
                    if(success.body[j].dia === me.day.value)
                        me.store.point[i].schedule.push({
                            begin: success.body[j].hora_inicio,
                            end: success.body[j].hora_fin
                        });
                for(j = 0; j < me.store.point[i].schedule.length; j++)
                    if(me.store.point[i].schedule[j].begin <= me.store.point[i].arrival &&
                       me.store.point[i].schedule[j].end > me.store.point[i].arrival)
                        me.store.point[i].scheduleIndex = j;
                if(me.store.point[i].schedule[me.store.point[i].scheduleIndex].begin === me.store.point[i].arrival)
                    me.store.point[i].calculate = false;
                if(i > 0)
                    me.initRoute(i);
            },
            function(error){
                console.log(error);
            });
        },
        initRoute: function(i){
            var me = this,
                j,
                travelTime = 0,
                distance = 0;
            this.map.directionService.route({
                origin: this.store.point[i - 1].main.position,
                destination: this.store.point[i].main.position,
                travelMode: "TRANSIT", //this.configuration.service.type, //"DRIVING", //NOTE: Transit not draggable
                avoidTolls: true
            },
            function(response, status){
                if(status === "OK"){
                    me.store.point[i - 1].renderer = new google.maps.DirectionsRenderer({
                        map: me.map.main,
                        draggable: true,
                        suppressMarkers: true,
                        preserveViewport: true
                    });
                    me.store.point[i - 1].renderer.setDirections(response);
                    me.store.point[i - 1].details.copyrights = response.routes[0].copyrights;
                    me.store.point[i - 1].details.warnings = [];
                    for(j = 0; j < response.routes[0].warnings.length; j++)
                        me.store.point[i - 1].details.warnings.push({
                            text: response.routes[0].warnings[j]
                        });
                    me.store.point[i - 1].details.legs.push({
                        hidden: false,
                        id: me.store.point[i - 1].details.legs.length,
                        end: response.routes[0].legs[0].end_address,
                        start: response.routes[0].legs[0].start_address,
                        steps: []
                    });
                    for(j = 0; j < response.routes[0].legs[0].steps.length; j++){
                        me.store.point[i - 1].details.legs[0].steps.push({
                            distance: {
                                value: response.routes[0].legs[0].steps[j].distance.value,
                                text: response.routes[0].legs[0].steps[j].distance.text
                            },
                            duration: {
                                value: response.routes[0].legs[0].steps[j].duration.value,
                                text: response.routes[0].legs[0].steps[j].duration.text
                            },
                            instructions: response.routes[0].legs[0].steps[j].instructions,
                            travel_mode: response.routes[0].legs[0].steps[j].travel_mode
                        });
                        travelTime += response.routes[0].legs[0].steps[j].duration.value;
                        distance += response.routes[0].legs[0].steps[j].distance.value;
                    }
                    
                    me.store.point[i].travel = (me.store.point[i].calculate) ? me.converter("string", me.converter("time", me.store.point[i].arrival) - me.converter("time", me.store.point[i].start)):
                        me.store.point[i].travel = me.converter("string", travelTime);
                    me.store.point[i].distance = distance;
                    me.store.data.totalDistance += distance;
                    me.store.point[i].death = me.converter("string", me.converter("time", me.store.point[i].arrival) - me.converter("time", me.store.point[i].start) - me.converter("time", me.store.point[i].travel));
                }
                else
                    console.log(status);
            });
        },
        getDirection: function(length){
            var me = this;
            this.store.point[length].main.addListener("rightclick", function(){
                if(!me.store.point[length].window.flag){
                    me.store.point[length].window.flag = true;
                    me.map.geocoder.geocode({                          //Geocoder for placing
                        location: me.store.point[length].main.position
                    },
                    function(response, status){
                        if(status === "OK" && response[0])
                            me.store.point[length].window.setContent(response[0].formatted_address);
                        else
                            console.log(status, response);
                    });
                }
                me.store.point[length].window.open(me.map.main, me.store.point[length].main);
            });
        },
        focusPosition: function(){
            var i,
                counter = 0,
                totalLat = 0,
                totalLng = 0,
                bounds = new google.maps.LatLngBounds();
            for(i = 0; i < this.store.point.length; i++)
                if(this.store.point[i].main !== null &&
                    this.store.point[i].lat !== null &&
                    this.store.point[i].lng !== null){
                    counter++;
                    totalLat += this.store.point[i].lat;
                    totalLng += this.store.point[i].lng;
                    bounds.extend(this.store.point[i].main.getPosition());
                     
                }
            if(counter > 0){
                this.map.main.setCenter({
                    lat: totalLat/counter,
                    lng: totalLng/counter
                });
                if(counter > 1)
                    this.map.main.fitBounds(bounds);
                else
                    this.map.main.setZoom(this.map.data.zoom);
            }
            else
                this.initGeocoder();
        },
        setPoint: function(iM){
            this.store.see.name = this.store.point[iM].name;
            this.store.see.scheduleBegin = this.store.point[iM].schedule[this.store.point[iM].scheduleIndex].begin;
            this.store.see.scheduleEnd = this.store.point[iM].schedule[this.store.point[iM].scheduleIndex].end;
            this.store.see.client = this.store.point[iM].client;
            this.store.see.start = this.store.point[iM].start;
            this.store.see.travel = this.store.point[iM].travel;
            this.store.see.death = this.store.point[iM].death;
            this.store.see.service = this.store.point[iM].usedTime;
            this.store.see.finish = this.converter("string", this.converter("time", this.store.see.start) + this.converter("time", this.store.see.travel) + this.converter("time", this.store.see.death) + this.converter("time", this.store.see.service));
        },
        collapse: function(){
            if(this.store.point.length > 0){
                this.store.point[0].hidden = !this.store.point[0].hidden;
                for(var i = 1; i < this.store.point.length; i++)
                    this.store.point[i].hidden = this.store.point[0].hidden;
            }
        },
        converter: function(type, val){
            var value;
            switch(type){
                case "time":    //val is string, want return as time
                    if(val){
                        val = val.split(":");
                        value = 0;
                        value += parseInt(val[0]) * 3600;
                        value += parseInt(val[1]) * 60;
                        value += parseInt(val[2]);
                    }
                    break;
                case "string":  //val is time, want return as string
                    var hours = Math.floor( val / 3600 );
                    var minutes = Math.floor( val / 60 - (hours * 60) );
                    var seconds = val - (hours * 3600) - (minutes * 60);
                    value = hours < 10 ? '0' + hours : hours;
                    value += ":" + (minutes < 10 ? '0' + minutes : minutes);
                    value += ":" + (seconds < 10 ? '0' + seconds : seconds);
                    break;
            }
            return value;
        }
    }
});