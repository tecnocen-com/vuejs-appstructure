module.exports = new Vue({
    data: {
        models: {
            ruta: null,
            rutaPunto: null,
            rutaPuntoServicio: null,
            sucursal: null,
            sucursalHorario: null,
            sucursalCliente: null
        },
        name: {
            value: null,
            valid: true,
            text: ""
        },
        step: 0,   //0 general data, 1 routes definition
        save: true,
        begin: {
            value: "",
            valid: true,
            text: "hh:mm:ss"
        },
        end: {
            value: "",
            valid: true,
            text: "hh:mm:ss"
        },
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
                selected: null,
                perPage: 50,
                page: {
                    store: {
                        currentPage: 1,
                        pageCount: null,
                        totalCount: null
                    }
                },
                search: {
                    store: "",
                    actualTime: null,
                    actualDay: null,
                    actualDistance: 0,
                    bounds: {
                        topLat: null,
                        topLng: null,
                        bottomLat: null,
                        bottomLng: null
                    }
                },
            },
            position: [],
            point: [],
            add: {
                client: [],
                schedule: [],
                index: null,
                name: null,
                stageTime: 0,
                existsBegin: false,
                validEnd: true,
                calculate: {
                    begin: null,
                    travel: null,
                    distance: null,
                    death: null,
                    end: true
                }
            },
            see: {
                scheduleBegin: null,
                scheduleEnd: null,
                client: [],
                start: null,
                travel: null,
                death: null,
                service: null,
                finish: null
                
            },
            edit: {
                index: null,
                scheduleBegin: null,
                scheduleEnd: null,
                client: [],
                start: null,
                travel: null,
                death: null,
                service: null,
                validEnd: true,
            },
            remove: {
                total: null,
            }
        }
    },
    methods: {
        init: function(e){
            var me = this;
            if(e){
                this.models.ruta = e.ruta;
                this.models.rutaPunto = e.rutaPunto;
                this.models.rutaPuntoServicio = e.rutaPuntoServicio;
                this.models.sucursal = e.sucursal;
                this.models.sucursalHorario = e.sucursalHorario;
                this.models.sucursalCliente = e.sucursalCliente;
            }
            else{
                Vue.nextTick(function(){
                    if(me.step === 1)
                        me.initMap();
                    $('.input-info').popover();
                });
            }
        },
        initMap: function(){
            var me = this;
            this.map.main = new google.maps.Map(document.getElementById('mapAddRoute'), {     //Define Map
                zoom: this.map.data.zoom
            });
            
            this.map.main.addListener("idle", function() {              //Bounds changed and Finish loading all map
                me.initBounds(me.map.main.getBounds());
            });
            this.initSearch();
            this.initFocus();
            this.initServices();
            this.initGeocoder();
            this.initStore(0, 1);
            this.initStoreSel();
        },
        initBounds: function(bounds){
            this.store.data.search.bounds.topLat = bounds.f.f;
            this.store.data.search.bounds.topLng = bounds.b.f;
            this.store.data.search.bounds.bottomLat = bounds.f.b;
            this.store.data.search.bounds.bottomLng = bounds.b.b;
            this.initStore();
        },
        initFocus: function(){
            this.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionAddRoute'));
        },
        initSearch: function(){
            var me = this;
            var input = document.getElementById('searchAddRoute');
            var searchBox = new google.maps.places.SearchBox(input);
            this.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    
            // Bias the SearchBox results towards current map's viewport.
            this.map.main.addListener('bounds_changed', function() {
              searchBox.setBounds(me.map.main.getBounds());
            });
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();
                if(places.length == 0){
                    return;
                }
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    if(!place.geometry){
                      console.log("Returned place contains no geometry");
                      return;
                    }
                    if(place.geometry.viewport){
                      // Only geocodes have viewport.
                      bounds.union(place.geometry.viewport);
                    }
                    else{
                      bounds.extend(place.geometry.location);
                    }
                  });
                me.map.main.fitBounds(bounds);
            });
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
        initStoreSel: function(){
            if(this.store.point.length > 0){
                for(var i = 0; i < this.store.point.length; i++){
                    this.store.point[i].main.setMap(this.map.main);
                    if(i < this.store.point.length - 1)
                        this.store.point[i].renderer.setMap(this.map.main);
                }
                this.focusPosition();
            }
        },
        initStore: function(e, page){
            var i,
                me = this;
            if(page)
                this.store.data.page.store.currentPage = page;
            if(e !== 0){
                this.store.data.selected = null;
                if(this.store.position.length > 0){
                    for(i = 0; i < this.store.position.length; i++)
                        if(this.store.position[i].main !== null)
                            this.store.position[i].main.setMap(null);
                    this.store.position = [];
                }
                this.models.sucursal.get({
                    params: {
                        "per-page": this.store.data.perPage,
                        "sort": "nombre",
                        "page": this.store.data.page.store.currentPage,
                        "nombre": this.store.data.search.store,
                        //"hora_abierto": this.store.data.search.actualTime,
                        "dia_abierto": this.store.data.search.actualDay,
                        "lat_sup": this.store.data.search.bounds.topLat,
                        "lng_sup": this.store.data.search.bounds.topLng,
                        "lat_inf": this.store.data.search.bounds.bottomLat,
                        "lng_inf": this.store.data.search.bounds.bottomLng
                    }
                },
                function(success){
                    me.store.data.page.store.pageCount = parseInt(success.headers.map["X-Pagination-Page-Count"][0]);
                    me.store.data.page.store.totalCount = parseInt(success.headers.map["X-Pagination-Total-Count"][0]);
                    if(success.body.length > 0){
                        for(i in success.body)
                            me.initMarker(success.body[i]);
                    }
                },
                function(error){
                    console.log(error);
                });
            }
        },
        initMarker: function(e){
            var me = this,
                i, linked = false,
                length = this.store.position.length;
            if(this.store.point.length > 0){
                for(i = 0; i < this.store.point.length; i++)
                    if(this.store.point[i].id === e.id)
                        linked = true;
            }
            this.store.position.push({
                main: linked ? null : new google.maps.Marker({
                    map: this.map.main,
                    position: {
                        lat: e.lat,
                        lng: e.lng
                    },
                    icon: {
                        url: "/image/maps/gray.png"
                    },
                    title: e.nombre,
                }),
                window: linked ? null : new google.maps.InfoWindow({
                    content: "Dirección no encontrada.",
                    maxWidth: 175,
                    disableAutoPan: true,
                    flag: false
                }),
                id: e.id,
                lat: e.lat,
                lng: e.lng,
                name: e.nombre,
                linked: linked,
                steps: [
                    {
                        dayNumber: 2,
                        schedule: []
                    },
                    {
                        dayNumber: 3,
                        schedule: []
                    },
                    {
                        dayNumber: 4,
                        schedule: []
                    },
                    {
                        dayNumber: 5,
                        schedule: []
                    },
                    {
                        dayNumber: 6,
                        schedule: []
                    },
                    {
                        dayNumber: 7,
                        schedule: []
                    },
                    {
                        dayNumber: 1,
                        schedule: []
                    }
                ]
            });
            if(this.store.position[length].main !== null)
                this.store.position[length].main.addListener("click", function(){
                    me.initPoint("add", length);
                });
            this.initSchedule(length, e.id);
            if(!linked)
                this.getDirection("store", length, e);
        },
        initSchedule: function(length, id){
            var me = this;
            Vue.nextTick(function(){
                $('#schedule-' + length).popover({
                    html: true,
                    container: "body",
                    content: function(){
                        var a = document.getElementById('popover-' + length).cloneNode(true);
                        a.className = "";
                        return a;
                    }
                });
            });
            this.models.sucursalHorario.get({
                delimiters: id,
                params: {
                    "per-page": 100,
                    "sort": "hora_inicio"
                }
            },
            function(success){
                for(i = 0; i < success.body.length; i++){
                    switch(success.body[i].dia){
                        case 1:     //SUN
                            me.store.position[length].steps[6].schedule.push({
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin
                            });
                            break;
                        default:
                            me.store.position[length].steps[success.body[i].dia - 2].schedule.push({
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin
                            });
                            break;
                    }
                }
            },
            function(error){
                console.log(error);
            });
        },
        getDirection: function(type, length, e){
            var me = this;
            switch(type){
                case "store":
                    this.store.position[length].main.addListener("rightclick", function(){
                        if(!me.store.position[length].window.flag){
                            me.store.position[length].window.flag = true;
                            me.map.geocoder.geocode({                          //Geocoder for placing
                                location: {
                                    lat: e.lat,
                                    lng: e.lng
                                }
                            },
                            function(response, status){
                                if(status === "OK" && response[0])
                                    me.store.position[length].window.setContent(response[0].formatted_address);
                                else
                                    console.log(status, response);
                            });
                        }
                        me.store.position[length].window.open(me.map.main, me.store.position[length].main);
                    });
                    break;
                case "point":
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
                    break;
            }
            
        },
        setStep: function(){
            var me = this,
                valid = true,
                hmdB = this.begin.value.split(":"),
                hmdE = this.end.value.split(":");
            if((this.begin.value !== null && this.begin.value !== "") &&
               (this.begin.value.length !== 8 ||
                (this.begin.value > "23:59:59" ||
                hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 ||
                !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 ||
                !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59))){
                BUTO.components.main.alert.description.text = "El horario de inicio no tiene un formato apropiado.";
                this.begin.valid = false;
                this.begin.text = "El horario de inicio no tiene un formato apropiado";
                valid = false;
            }
            else if(valid && (this.end.value !== null && this.end.value !== "") &&
                (this.end.value.length !== 8 ||
                (this.end.value > "23:59:59" ||
                 hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 ||
                 !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 ||
                 !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59))){
                BUTO.components.main.alert.description.text = "El horario de término no tiene un formato apropiado.";
                this.end.valid = false;
                this.end.text = "El horario de término no tiene un formato apropiado";
                valid = false;
            }
            else if(valid && (this.begin.value !== null && this.begin.value !== "") &&
                    (this.end.value !== null && this.end.value !== "") &&
                    this.begin.value >= this.end.value){
                BUTO.components.main.alert.description.text = "El horario de término debe ser mayor al horario de inicio.";
                this.end.valid = false;
                this.end.text = "El horario de término debe ser mayor al horario de inicio";
                valid = false;
            }
            else if(valid){
                this.store.data.search.actualTime = this.begin.value;
                this.store.data.search.actualDay = this.day.value;
                if(this.step === 0){
                    this.step = 1;
                    Vue.nextTick(function(){
                        me.initMap();
                    });
                }
                else
                    this.initStore();
            }
            else{
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            }
        },
        selector: function(i){
            if(i !== null && this.store.position[i].main !== null)
                this.store.data.selected = i;
            for(var j = 0; j < this.store.position.length; j++)
                if(this.store.position[j].main !== null)
                    this.store.position[j].main.setIcon(i === j ? "/image/maps/select.png" : "/image/maps/gray.png");
        },
        validation: function(type){
            switch(type){
                case "name":
                    this.name.valid = false;
                    if(this.name.value === null ||
                       this.name.value === "")
                        this.name.text = "Nombre no puede estar vacío";
                    else if(this.name.value.length < 4)
                        this.name.text = "Nombre debe contener al menos 4 caracteres";
                    else{
                        this.name.text = "";
                        this.name.valid = true;
                    }
                    break;
                case "time-begin":
                    this.begin.valid = false;
                    if(this.begin.value === null ||
                       this.begin.value === "")
                        this.begin.text = "El horario de inicio no puede estar vacío";
                    else if(this.begin.value.length !== 8)
                        this.begin.text = "El horario de inicio no tiene un formato apropiado";
                    else{
                        this.begin.text = "hh:mm:ss";
                        this.begin.valid = true;
                    }
                    break;
                case "time-end":
                    this.end.valid = false;
                    if(this.end.value === null ||
                       this.end.value === "")
                        this.end.text = "El horario de término no puede estar vacío";
                    else if(this.end.value.length !== 8)
                        this.end.text = "El horario de término no tiene un formato apropiado";
                    else{
                        this.end.text = "hh:mm:ss";
                        this.end.valid = true;
                    }
                    break;
            }
        },
        initPoint: function(type, i){
            var j,
                me = this;
            switch(type){
                case "add":
                    if(!this.store.position[i].linked){         //Store not added
                        this.store.add.index = i;
                        this.store.add.name = this.store.position[i].name;
                        this.models.sucursalCliente.get({
                            delimiters: this.store.position[i].id,
                            params: {
                                "expand": "cliente"
                            }
                        },
                        function(success){
                            if(success.body.length > 0){        //There is linked clients
                                if(me.store.add.client.length > 0)
                                    me.store.add.client = [];
                                if(me.store.add.schedule.length > 0)
                                    me.store.add.schedule = [];
                                for(j = 0; j < success.body.length; j++)
                                    me.initAddClient(success.body[j]);
                                me.initAddSchedule(i);
                            }
                            else{                               //There are not clients
                                BUTO.components.main.alert.description.title = "Errores en Agregado de Etapa";
                                BUTO.components.main.alert.description.text = me.store.position[i].name + " no está ligada a ningún cliente.";
                                BUTO.components.main.alert.description.ok = "Aceptar";
                                BUTO.components.main.alert.active = true;
                            }
                        },
                        function(error){
                            console.log(error);
                            BUTO.components.main.alert.description.title = "Errores en Agregado de Etapa";
                            BUTO.components.main.alert.description.text = "";
                            if(error.body.length > 0)
                                for(j = 0; j < error.body.length; j++)
                                    BUTO.components.main.alert.description.text += error.body[j].message + "<br>";
                            else
                                BUTO.components.main.alert.description.text = "Inténtalo de nuevo.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                        });    
                    }
                    break;
                case "edit":
                    j = 0;
                    while(this.store.point[i].schedule[j].active !== true)
                        j++;
                    this.store.edit.scheduleBegin = this.store.point[i].schedule[j].begin;
                    this.store.edit.scheduleEnd = this.store.point[i].schedule[j].end;
                    this.store.edit.index = i;
                    this.store.edit.validEnd = true;
                    this.store.edit.client = [];
                    for(j = 0; j < this.store.point[i].client.length; j++)
                        this.store.edit.client.push({
                            name: this.store.point[i].client[j].name,
                            time: this.store.point[i].client[j].time,
                            active: this.store.point[i].client[j].active
                        });
                    this.store.edit.start = this.store.point[i].start;
                    this.store.edit.travel = this.store.point[i].travel;
                    this.store.edit.death = this.store.point[i].death;
                    this.store.edit.service = this.store.point[i].usedTime;
                    break;
            }
        },
        initAddClient: function(e){
            if(this.store.add.client.length === 0)
                this.store.add.stageTime = this.converter("string", this.converter("time", e.tiempo_solicitado));
            this.store.add.client.push({
                id: e.cliente_id,
                name: e._embedded.cliente.nombre,
                time: e.tiempo_solicitado,
                active: this.store.add.client.length === 0
            });
        },
        initAddSchedule: function(i){
            var j,
                actualTime,
                deathTime = "00:00:00",
                status = null,
                index,
                actualDay = this.store.data.search.actualDay === 1 ? 6 : this.store.data.search.actualDay - 2;
            if(this.store.point.length === 0){         //First point
                if(this.begin.value !== null &&
                    this.begin.value !== "" &&
                    this.begin.valid){               //There is a value in route start
                    this.store.add.existsBegin = true;
                    actualTime = this.begin.value;
                    for(j = 0; j < this.store.position[i].steps[actualDay].schedule.length; j++){
                        if(this.store.position[i].steps[actualDay].schedule[j].begin <= this.begin.value &&
                           this.store.position[i].steps[actualDay].schedule[j].end > this.begin.value){
                            status = 0;         //There is an actual schedule that cross with beginning value
                            index = j;
                           }
                        else if(this.store.position[i].steps[actualDay].schedule[j].begin > this.begin.value && status === null){
                            status = 1;         //There is not a property schedule but can wait for next opening
                            index = j;
                        }
                    }
                    if(status !== null){
                        if(status === 1)
                            deathTime = this.converter("string", this.converter("time", this.store.position[i].steps[actualDay].schedule[index].begin) - this.converter("time", actualTime));
                        for(j = 0; j < this.store.position[i].steps[actualDay].schedule.length; j++)
                            this.store.add.schedule.push({
                                begin: this.store.position[i].steps[actualDay].schedule[j].begin,
                                end: this.store.position[i].steps[actualDay].schedule[j].end,
                                active: j === index
                            });
                    }
                }
                else{
                    this.store.add.existsBegin = false;
                    status = 0;         //There is an actual schedule that cross with beginning value
                    actualTime = this.store.position[i].steps[actualDay].schedule[0].begin;
                    for(j = 0; j < this.store.position[i].steps[actualDay].schedule.length; j++)
                       this.store.add.schedule.push({
                            begin: this.store.position[i].steps[actualDay].schedule[j].begin,
                            end: this.store.position[i].steps[actualDay].schedule[j].end,
                            active: j === 0
                        }); 
                }
            }
            else{           //Consequent points
                this.store.add.existsBegin = this.begin.value !== null && this.begin.value !== "" && this.begin.valid;
                actualTime = this.store.data.search.actualTime;
                for(j = 0; j < this.store.position[i].steps[actualDay].schedule.length; j++){
                    if(this.store.position[i].steps[actualDay].schedule[j].begin <= this.store.data.search.actualTime &&
                       this.store.position[i].steps[actualDay].schedule[j].end > this.store.data.search.actualTime){
                        status = 0;         //There is an actual schedule that cross with beginning value
                        index = j;
                    }
                    else if(this.store.position[i].steps[actualDay].schedule[j].begin > this.store.data.search.actualTime && status === null){
                        status = 1;         //There is not a property schedule but can wait for next opening
                        index = j;
                    }
                }
                if(status !== null){
                    if(status === 1)
                        deathTime = this.converter("string", this.converter("time", this.store.position[i].steps[actualDay].schedule[index].begin) - this.converter("time", actualTime));
                    for(j = 0; j < this.store.position[i].steps[actualDay].schedule.length; j++)
                        this.store.add.schedule.push({
                            begin: this.store.position[i].steps[actualDay].schedule[j].begin,
                            end: this.store.position[i].steps[actualDay].schedule[j].end,
                            active: j === index
                        });
                }
            }
            if(status === null){        //Not valid store because of its schedules
                BUTO.components.main.alert.description.title = "Errores en Agregado de Etapa";
                BUTO.components.main.alert.description.text = this.store.position[i].name + " no tiene horarios que puedan relacionarse con las especificaciones de la ruta.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            }
            else{
                $('#add').modal('show');
                this.initRoute("new", i, actualTime, deathTime);
            }
        },
        initRoute: function(type, i, actualTime, deathTime, total){
            var me = this,
                j,
                travelTime = 0,
                distance = 0;
            switch(type){
                case "new":
                    if(this.store.point.length > 0){        //There is more than 1 point
                        this.map.directionService.route({
                            origin: this.store.point[this.store.point.length - 1].main.position,
                            destination: this.store.position[i].main.position,
                            travelMode: "TRANSIT", //this.configuration.service.type, //"DRIVING", //NOTE: Transit not draggable
                            avoidTolls: true
                        },
                        function(response, status){
                            if(status === "OK"){
                                me.store.point[me.store.point.length - 1].renderer = new google.maps.DirectionsRenderer({
                                    map: me.map.main,
                                    draggable: true,
                                    suppressMarkers: true,
                                    preserveViewport: true
                                });
                                me.store.point[me.store.point.length - 1].renderer.setDirections(response);
                                me.store.point[me.store.point.length - 1].details.copyrights = response.routes[0].copyrights;
                                me.store.point[me.store.point.length - 1].details.warnings = [];
                                for(i = 0; i < response.routes[0].warnings.length; i++)
                                    me.store.point[me.store.point.length - 1].details.warnings.push({
                                        text: response.routes[0].warnings[i]
                                    });
                                me.store.point[me.store.point.length - 1].details.legs.push({
                                    hidden: false,
                                    id: me.store.point[me.store.point.length - 1].details.legs.length,
                                    end: response.routes[0].legs[0].end_address,
                                    start: response.routes[0].legs[0].start_address,
                                    steps: []
                                });
                                for(i = 0; i < response.routes[0].legs[0].steps.length; i++){
                                    me.store.point[me.store.point.length - 1].details.legs[0].steps.push({
                                        distance: {
                                            value: response.routes[0].legs[0].steps[i].distance.value,
                                            text: response.routes[0].legs[0].steps[i].distance.text
                                        },
                                        duration: {
                                            value: response.routes[0].legs[0].steps[i].duration.value,
                                            text: response.routes[0].legs[0].steps[i].duration.text
                                        },
                                        instructions: response.routes[0].legs[0].steps[i].instructions,
                                        travel_mode: response.routes[0].legs[0].steps[i].travel_mode
                                    });
                                    travelTime += response.routes[0].legs[0].steps[i].duration.value;
                                    distance += response.routes[0].legs[0].steps[i].distance.value;
                                }
                            }
                            else
                                console.log(status);
                            me.store.add.calculate.travel = me.converter("string", travelTime);
                            me.store.add.calculate.distance = distance;
                            me.store.add.calculate.begin = actualTime;
                            me.store.add.calculate.death = (me.converter("time", deathTime) <= travelTime) ? "00:00:00" : me.converter("string", me.converter("time", deathTime) - travelTime);
                            me.setValidEnd();
                        });
                    }
                    else{
                        this.store.add.calculate.distance = distance;
                        this.store.add.calculate.travel = this.converter("string", travelTime);
                        this.store.add.calculate.begin = actualTime;
                        this.store.add.calculate.death = deathTime;
                        this.setValidEnd();
                    }
                    break;
                case "all":
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
                            
                            me.store.point[i].travel = me.converter("string", travelTime);
                            me.store.point[i].distance = distance;
                            me.store.data.search.actualDistance += distance;
                            
                            me.store.remove.total += i;
                            if(total === me.store.remove.total){
                                for(j = 1; j < me.store.point.length; j++){
                                    me.store.point[j].start = me.converter('string', me.converter('time', me.store.point[j - 1].start) + me.converter('time', me.store.point[j - 1].death) + me.converter('time', me.store.point[j - 1].travel) + me.converter('time', me.store.point[j - 1].usedTime));
                                    me.store.point[j].death = (me.converter("time", me.store.point[j].schedule[me.store.point[j].scheduleIndex].begin) <= (me.converter('time', me.store.point[j].travel) + me.converter("time", me.store.point[j].start))) ? "00:00:00" : me.converter("string", me.converter("time", me.store.point[j].schedule[me.store.point[j].scheduleIndex].begin) - me.converter('time', me.store.point[j].travel) - me.converter("time", me.store.point[j].start));
                                    if(me.converter('time', me.store.point[j].start) + me.converter('time', me.store.point[j].death) + me.converter('time', me.store.point[j].travel) + me.converter('time', me.store.point[j].usedTime) > me.converter('time', me.store.point[j].schedule[me.store.point[j].scheduleIndex].end)){
                                        me.store.point[j].schedule[me.store.point[j].scheduleIndex].active = false;
                                        me.store.point[j].schedule[++me.store.point[j].scheduleIndex].active = true;
                                        me.store.point[j].death = (me.converter("time", me.store.point[j].schedule[me.store.point[j].scheduleIndex].begin) <= (me.converter('time', me.store.point[j].travel) + me.converter("time", me.store.point[j].start))) ? "00:00:00" : me.converter("string", me.converter("time", me.store.point[j].schedule[me.store.point[j].scheduleIndex].begin) - me.converter('time', me.store.point[j].travel) - me.converter("time", me.store.point[j].start));
                                    }
                                }
                                me.store.data.search.actualTime = me.converter('string', me.converter('time', me.store.point[j - 1].start) + me.converter('time', me.store.point[j - 1].death) + me.converter('time', me.store.point[j - 1].travel) + me.converter('time', me.store.point[j - 1].usedTime));
                                me.end.value = me.store.data.search.actualTime;
                            }
                        }
                        else
                            console.log(status);
                    });
                    break;
            }
        },
        setAddClient: function(i){
            var time = 0;
            this.store.add.client[i].active = !this.store.add.client[i].active;
            for(i = 0; i < this.store.add.client.length; i++)
                if(this.store.add.client[i].active)
                    time += this.converter("time", this.store.add.client[i].time);
            this.store.add.stageTime = this.converter("string", time);
            this.setValidEnd();
        },
        setAddSchedule: function(i){
            if(!this.store.add.schedule[i].active){
                for(var j = 0; j < this.store.add.schedule.length; j++)
                    this.store.add.schedule[j].active = i === j;
                if(!this.store.add.existsBegin && this.store.point.length === 0)
                    this.store.add.calculate.begin = this.store.add.schedule[i].begin;
                if(this.store.add.existsBegin)
                    this.store.add.calculate.death = this.converter("time", this.store.add.schedule[i].begin) <= (this.converter("time", this.store.data.search.actualTime) + this.converter("time", this.store.add.calculate.travel)) ? "00:00:00" : this.converter("string", this.converter("time", this.store.add.schedule[i].begin) - (this.converter("time", this.store.data.search.actualTime) + this.converter("time", this.store.add.calculate.travel)));
                this.setValidEnd();
            }
        },
        setValidEnd: function(){
            var i;
            for(var j = 0; j < this.store.add.schedule.length; j++)
                    if(this.store.add.schedule[j].active)
                        i = j;
            this.store.add.validEnd = this.store.add.schedule[i].end >= (this.converter('string', this.converter('time', this.store.add.stageTime) + this.converter('time', this.store.add.calculate.travel) + this.converter('time', this.store.add.calculate.begin) + this.converter('time', this.store.add.calculate.death)));
        },
        setEditClient: function(i){
            var time = 0;
            this.store.edit.client[i].active = !this.store.edit.client[i].active;
            for(i = 0; i < this.store.edit.client.length; i++)
                if(this.store.edit.client[i].active)
                    time += this.converter("time", this.store.edit.client[i].time);
            this.store.edit.service = this.converter("string", time);
            this.store.edit.validEnd = this.store.edit.scheduleEnd >= (this.converter('string', this.converter('time', this.store.edit.service) + this.converter('time', this.store.edit.travel) + this.converter('time', this.store.edit.start) + this.converter('time', this.store.edit.death)));
        },
        setPoint: function(type, iM){
            var active = false,
                i, j = 0, newPoint,
                length;
            switch(type){
                case "add":
                    for(j = 0; j < this.store.add.client.length; j++)
                        if(this.store.add.client[j].active)     //There is at least 1 client to add
                            active = true;
                    if(this.store.add.validEnd && active){      //Everything is good
                        length = this.store.point.length;
                        this.store.position[this.store.add.index].linked = true;
                        this.store.data.search.actualTime = this.converter('string', this.converter('time', this.store.add.stageTime) + this.converter('time', this.store.add.calculate.travel) + this.converter('time', this.store.add.calculate.begin) + this.converter('time', this.store.add.calculate.death));
                        this.store.data.search.actualDistance += this.store.add.calculate.distance;
                        if(!this.store.add.existsBegin){        //There is no beginning schedule 
                            this.begin.value = this.store.point.length === 0 ? this.store.add.calculate.begin : this.store.point[0].start;
                            this.begin.valid = true;
                            this.begin.text = "";
                        }
                        if(this.store.add.calculate.end)
                            this.end.value = this.store.data.search.actualTime;
                        this.store.point.push({
                            id: this.store.position[this.store.add.index].id,
                            lat: this.store.position[this.store.add.index].lat,
                            lng: this.store.position[this.store.add.index].lng,
                            name: this.store.position[this.store.add.index].name,
                            schedule: this.store.add.schedule,
                            scheduleIndex: null,
                            client: this.store.add.client,
                            travel: this.store.add.calculate.travel,
                            distance: this.store.add.calculate.distance,
                            start: this.store.add.calculate.begin,
                            death:  this.store.add.calculate.death,
                            usedTime: this.store.add.stageTime,
                            hidden: true,
                            renderer: null,
                            details: {
                                warnings: null,
                                copyrights: [],
                                legs: []
                            },
                            main: new google.maps.Marker({
                                map: this.map.main,
                                position: {
                                    lat: this.store.position[this.store.add.index].lat,
                                    lng: this.store.position[this.store.add.index].lng
                                },
                                icon: {
                                    url: "/image/maps/green-empty.png",
                                    labelOrigin: new google.maps.Point(11, 11)
                                },
                                label: "" + (this.store.point.length + 1) + "",
                                title: this.store.position[this.store.add.index].name,
                            }),
                            window: new google.maps.InfoWindow({
                                content: this.store.position[this.store.add.index].window.getContent(),
                                maxWidth: 175,
                                disableAutoPan: true,
                                flag: false
                            }),
                            valid: true
                        });
                        this.getDirection("point", length);
                        this.initStore();
                        $('#add').modal('hide');
                    }
                    else{
                        BUTO.components.main.alert.description.title = "Errores en Agregado de Etapa";
                        BUTO.components.main.alert.description.text = !this.store.add.validEnd ? "El horario de término de la ruta excede el horario final del intervalo activo." :
                                                                        "Debes seleccionar al menos un cliente para atender.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    break;
                case "remove":
                    newPoint = [];
                    for(i = 0; i < this.store.point.length; i++){
                        if(i !== iM){
                            this.store.point[i].main.setLabel("" + (++j) + "");
                            newPoint.push(this.store.point[i]);
                        }
                        else{
                            this.store.point[i].main.setMap(null);
                            if(this.store.point[i].renderer !== null)
                                this.store.point[i].renderer.setMap(null);
                        }
                    }
                    this.store.point = newPoint;
                    this.redefineRoute();
                    break;
                case "cancel":
                    if(this.store.point.length > 0){
                        this.store.point[this.store.point.length - 1].renderer.setMap(null);
                        this.store.point[this.store.point.length - 1].renderer = null;
                        this.store.point[this.store.point.length - 1].details = {
                            warnings: null,
                            copyrights: [],
                            legs: []
                        };
                    }
                    break;
                case "see":
                    i = 0;
                    while(this.store.point[iM].schedule[i].active !== true)
                        i++;
                    this.store.see.name = this.store.point[iM].name;
                    this.store.see.scheduleBegin = this.store.point[iM].schedule[i].begin;
                    this.store.see.scheduleEnd = this.store.point[iM].schedule[i].end;
                    this.store.see.client = this.store.point[iM].client;
                    this.store.see.start = this.store.point[iM].start;
                    this.store.see.travel = this.store.point[iM].travel;
                    this.store.see.death = this.store.point[iM].death;
                    this.store.see.service = this.store.point[iM].usedTime;
                    this.store.see.finish = this.converter("string", this.converter("time", this.store.see.start) + this.converter("time", this.store.see.travel) + this.converter("time", this.store.see.death) + this.converter("time", this.store.see.service));
                    break;
                case "edit":
                    if(this.store.edit.validEnd){
                        
                    }
                    else{
                        BUTO.components.main.alert.description.title = "Errores en Editado de Etapa";
                        BUTO.components.main.alert.description.text = "El horario de término de la ruta excede el horario final del intervalo activo.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    break;
            }
        },
        redefineRoute: function(){
            var i, j,
                status = null, newIndex,
                total = 0;
            if(this.store.point.length > 0){
                this.store.remove.total = 0;
                for(i = 0; i < this.store.point.length; i++)
                    total += i;
                for(i = 0; i < this.store.point.length; i++){
                    newIndex = 0;
                    status = null;
                    if(this.store.point[i].renderer !== null)
                        this.store.point[i].renderer.setMap(null);
                    this.store.point[i].details = {
                        warnings: null,
                        copyrights: [],
                        legs: []
                    };
                    if(i === 0 && this.begin.value !== null &&
                        this.begin.value !== "" && this.begin.valid){       //First and suitable begin value
                        for(j = 0; j < this.store.point[i].schedule.length; j++)
                            if(this.store.point[i].schedule[j].begin <= this.begin.value &&
                               this.store.point[i].schedule[j].end > this.begin.value){
                                status = 0;
                                newIndex = j;
                               }
                            else if(status === null && this.store.point[i].schedule[j].begin > this.begin.value){
                                status = 1;
                                newIndex = j;
                            }
                        this.store.point[i].start = this.begin.value;
                        this.store.point[i].death = (this.converter("time", this.store.point[i].schedule[newIndex].begin) <= this.converter("time", this.begin.value)) ? "00:00:00" : this.converter("string", this.converter("time", this.store.point[i].schedule[newIndex].begin) - this.converter("time", this.begin.value));
                        this.store.point[i].travel = "00:00:00";
                        this.store.point[i].distance = 0;
                        this.store.data.search.actualTime = this.converter('string', this.converter('time', this.store.point[i].start) + this.converter('time', this.store.point[i].death) + this.converter('time', this.store.point[i].travel) + this.converter('time', this.store.point[i].usedTime));
                        this.store.data.search.actualDistance = 0;
                        this.end.value = this.store.data.search.actualTime;
                    }
                    else if(i === 0){                                       //First but non suitable begin value
                        this.begin.value = this.store.point[i].schedule[newIndex].begin;
                        this.begin.valid = true;
                        this.store.point[i].start = this.store.point[i].schedule[newIndex].begin;
                        this.store.point[i].death = "00:00:00";
                        this.store.point[i].travel = "00:00:00";
                        this.store.point[i].distance = 0;
                        this.store.data.search.actualTime = this.converter('string', this.converter('time', this.store.point[i].start) + this.converter('time', this.store.point[i].death) + this.converter('time', this.store.point[i].travel) + this.converter('time', this.store.point[i].usedTime));
                        this.store.data.search.actualDistance = 0;
                        this.end.value = this.store.data.search.actualTime;
                    }
                    else{                           //Next points
                        for(j = 0; j < this.store.point[i].schedule.length; j++)
                            if(this.store.point[i].schedule[j].begin <= this.store.data.search.actualTime &&
                               this.store.point[i].schedule[j].end > this.store.data.search.actualTime){
                                this.store.point[i].schedule[j].active = true;
                                status = 0;
                                newIndex = j;
                            }
                            else if(status === null && this.store.point[i].schedule[j].begin > this.store.data.search.actualTime){
                                this.store.point[i].schedule[j].active = true;
                                status = 1;
                                newIndex = j;
                            }
                            else
                                this.store.point[i].schedule[j].active = false;
                        this.store.point[i].scheduleIndex = newIndex;
                        this.initRoute("all", i, null, null, total);
                    }
                }
            }
            this.initStore();
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
        }, 
        focusPosition: function(){
            var i,
                counter = 0,
                totalLat = 0,
                totalLng = 0,
                bounds = new google.maps.LatLngBounds();
            for(i = 0; i < this.store.position.length; i++)
                if(this.store.position[i].main !== null &&
                    this.store.position[i].lat !== null &&
                    this.store.position[i].lng !== null){
                    counter++;
                    totalLat += this.store.position[i].lat;
                    totalLng += this.store.position[i].lng;
                    bounds.extend(this.store.position[i].main.getPosition());
                     
                }
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
        submit: function(){
            var me = this,
                i, j, first = true,
                hmdB = this.begin.value.split(":"),
                hmdE = this.end.value.split(":"),
                valid = true;
                
            if(this.name.value === null || this.name.value === ""){     //No name
                BUTO.components.main.alert.description.text = "Nombre no puede estar vacío.";
                this.name.valid = false;
                this.name.text = "Nombre no puede estar vacío";
                valid = false;
            }
            else if(valid && this.name.value.length < 4){
                BUTO.components.main.alert.description.text = "Nombre debe contener al menos 4 caracteres.";
                this.name.valid = false;
                this.name.text = "Nombre no puede estar vacío";
                valid = false;
            }
            else if(valid && (this.begin.value === null || this.begin.value === "")){
                BUTO.components.main.alert.description.text = "El horario de inicio no puede estar vacío.";
                this.begin.valid = false;
                this.begin.text = "El horario de inicio no puede estar vacío";
                valid = false;
            }
            else if(valid && (this.begin.value.length !== 8 ||
                (this.begin.value > "23:59:59" ||
                 hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59))){
                BUTO.components.main.alert.description.text = "El horario de inicio no tiene un formato apropiado.";
                this.begin.valid = false;
                this.begin.text = "El horario de inicio no tiene un formato apropiado";
                valid = false;
            }
            else if(valid && (this.end.value === null || this.end.value === "")){
                BUTO.components.main.alert.description.text = "El horario de término no puede estar vacío.";
                this.end.valid = false;
                this.end.text = "El horario de término no puede estar vacío";
                valid = false;
            }
            else if(valid && (this.end.value.length !== 8 ||
                (this.end.value > "23:59:59" ||
                 hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59))){
                BUTO.components.main.alert.description.text = "El horario de término no tiene un formato apropiado.";
                this.end.valid = false;
                this.end.text = "El horario de término no tiene un formato apropiado";
                valid = false;
            }
            else if(valid && this.store.data.search.actualTime > this.end.value){
                BUTO.components.main.alert.description.text = "El horario de término debe ser igual o mayor al horario de término de la última etapa de la ruta.";
                this.end.valid = false;
                this.end.text = "El horario de término debe ser igual o mayor al horario de término de la última etapa de la ruta";
                valid = false;
            }
            if(valid){
                this.models.ruta.post({
                    params: {
                        nombre: this.name.value,
                        dia: this.day.value,
                        hora_inicio: this.begin.value,
                        hora_fin: this.end.value,
                        lat_inicio: this.store.point[0].lat,
                        lng_inicio: this.store.point[0].lng,
                        lat_fin: this.store.point[this.store.point.length - 1].lat,
                        lng_fin: this.store.point[this.store.point.length - 1].lng
                    }
                },
                function(success){
                    me.save = false;
                    for(i = 0; i < me.store.point.length; i++)
                        me.submitPoint(success.body.id, i);
                    BUTO.components.main.children.rutasRegistradas.grid.updatePagination();
                    BUTO.components.main.alert.description.title = "Registro de Ruta";
                    BUTO.components.main.alert.description.text = "Se ha registrado correctamente la ruta '" + success.body.nombre + "'";
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                },
                function(error){
                    console.log(error);
                    BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                    BUTO.components.main.alert.description.text = "";
                    if(error.body.length > 0)
                        for(i = 0; i < error.body.length; i++){
                            BUTO.components.main.alert.description.text += error.body[i].message + "<br>";
                            if(error.body[i].field === "nombre"){
                                me.name.valid = false;
                                me.name.text = error.body[i].message;
                            }
                        }
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                });
            }
            else{
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            }
        },
        submitPoint: function(routeId, i){
            var me = this, j;
            this.models.rutaPunto.post({
                delimiters: routeId,
                params: {
                    sucursal_id: this.store.point[i].id,
                    hora_llegada_estimada: this.converter("string", this.converter("time", this.store.point[i].start) + this.converter("time", this.store.point[i].travel) + this.converter("time", this.store.point[i].death))
                    //Takes start, travel and death
                }
            },
            function(success){
                for(j = 0; j < me.store.point[i].client.length; j++)
                    me.submitService(routeId, success.body.id, i, j);
            },
            function(error){
                console.log(error);
            });
        },
        submitService: function(routeId, pointId, i, j){
            var me = this;
            if(this.store.point[i].client[j].active)
                this.models.rutaPuntoServicio.post({
                    delimiters: [routeId, pointId],
                    params: {
                        cliente_id: this.store.point[i].client[j].id
                    }
                },
                function(success){
                    
                },
                function(error){
                    console.log(error);
                });
            if(i === me.store.point.length - 1 &&
               j === me.store.point[i].client.length - 1)
                setTimeout(function(){
                    me.reset("all");
                }, 500);
                        
        },
        reset: function(type){
            switch(type){
                //case "route":
                //    this.step = 0;
                //    this.name.value = null;
                //    this.name.valid = true;
                //    this.name.text = "";
                //    this.begin.value = "";
                //    this.begin.valid = true;
                //    this.begin.text = "hh:mm:ss";
                //    this.end.value = "";
                //    this.end.valid = true;
                //    this.end.text = "hh:mm:ss";
                //    this.day.value = 2;
                //    this.store.data.search.actualTime = null;
                //    this.store.data.search.actualDay = null;
                //    break;
                //case "service":
                //    this.store.point[i]
                //    this.steps[i].active = true;
                //    this.steps[i].interval = 1;
                //    this.steps[i].seen = (this.steps[i].dayNumber === 2) ? true : false;
                //    if(!this.sameConf){
                //        if(!this.sameConf && j !== null){
                //            if(this.steps[i].schedule[j].main_begin !== null)
                //                this.steps[i].schedule[j].main_begin.setMap(null);
                //            if(this.steps[i].schedule[j].main_end !== null)
                //                this.steps[i].schedule[j].main_end.setMap(null);
                //        }
                //        else if(!this.sameConf && j === null){
                //            for(j = 0; j < this.steps[i].length; j++){
                //                if(this.steps[i].schedule[j].main_begin !== null)
                //                this.steps[i].schedule[j].main_begin.setMap(null);
                //            if(this.steps[i].schedule[j].main_end !== null)
                //                this.steps[i].schedule[j].main_end.setMap(null);
                //            }
                //        }
                //    }
                //    if(this.steps[i].dayNumber === 1 &&
                //        j === this.steps[this.sameConf ? 0 : i].schedule.length - 1)
                //        this.reset("all");
                //    break;
                //case "client":
                //    
                //    break;
                case "all":
                    this.save = true;
                    this.step = 0;
                    this.name.value = null;
                    this.name.valid = true;
                    this.name.text = "";
                    this.begin.value = "";
                    this.begin.valid = true;
                    this.begin.text = "hh:mm:ss";
                    this.end.value = "";
                    this.end.valid = true;
                    this.end.text = "hh:mm:ss";
                    this.day.value = 2;
                    this.store.data.search.actualTime = null;
                    this.store.data.search.actualDay = null;
                    this.store.point = [];
                    this.initStore();
                    break;
            }
        }
    }
});