module.exports = new Vue({
    data: {
        id: null,
        models: {
            usuarioEmpleado: null,
            empleado: null,
            empleadoHorario: null
        },
        name: {
            value: null,
            valid: true,
            text: ""
        },
        email: {
            value: null,
            valid: true,
            text: ""
        },
        pass: {
            value: null,
            valid: true,
            text: ""
        },
        repass: {
            value: null,
            valid: true,
            text: ""
        },
        phone: {
            value: null,
            valid: true,
            text: ""
        },
        map: {
            main: null,
            geocoder: null,
            marker: [
                {
                    text: "Lu",
                    textU_begin: "I",
                    textU_end: "F"
                },
                {
                    text: "Ma"
                },
                {
                    text: "Mi"
                },
                {
                    text: "Ju"
                },
                {
                    text: "Vi"
                },
                {
                    text: "Sa"
                },
                {
                    text: "Do"
                }
            ],
            data: {
                address: "Ciudad de México, México",
                zoom: 13
            }
        },
        sameConf: false,
        allPosVisible: 0,
        actualStep: 0,
        maxInterval: 5,
        steps: [
            {
                text: "Lunes",
                dayNumber: 2,
                active: true,
                schedule: [
                    {
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        textBegin: "hh:mm:ss",
                        textEnd: "hh:mm:ss",
                        
                        main_begin: null,
                        main_end: null,
                        window_begin: null,
                        window_end: null,
                        lat_begin: null,
                        lng_begin: null,
                        lat_end: null,
                        lng_end: null,
                        active: true
                    }
                ],
                interval: 1,
                seen: true
            },
            {
                text: "Martes",
                dayNumber: 3,
                active: true,
                schedule: [
                    {
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        textBegin: "hh:mm:ss",
                        textEnd: "hh:mm:ss",
                        
                        main_begin: null,
                        main_end: null,
                        window_begin: null,
                        window_end: null,
                        lat_begin: null,
                        lng_begin: null,
                        lat_end: null,
                        lng_end: null,
                        active: true
                    }
                ],
                interval: 1,
                seen: true
            },
            {
                text: "Miércoles",
                dayNumber: 4,
                active: true,
                schedule: [
                    {
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        textBegin: "hh:mm:ss",
                        textEnd: "hh:mm:ss",
                        
                        main_begin: null,
                        main_end: null,
                        window_begin: null,
                        window_end: null,
                        lat_begin: null,
                        lng_begin: null,
                        lat_end: null,
                        lng_end: null,
                        active: true
                    }
                ],
                interval: 1,
                seen: true
            },
            {
                text: "Jueves",
                dayNumber: 5,
                active: true,
                schedule: [
                    {
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        textBegin: "hh:mm:ss",
                        textEnd: "hh:mm:ss",
                        
                        main_begin: null,
                        main_end: null,
                        window_begin: null,
                        window_end: null,
                        lat_begin: null,
                        lng_begin: null,
                        lat_end: null,
                        lng_end: null,
                        active: true
                    }
                ],
                interval: 1,
                seen: true
            },
            {
                text: "Viernes",
                dayNumber: 6,
                active: true,
                schedule: [
                    {
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        textBegin: "hh:mm:ss",
                        textEnd: "hh:mm:ss",
                        
                        main_begin: null,
                        main_end: null,
                        window_begin: null,
                        window_end: null,
                        lat_begin: null,
                        lng_begin: null,
                        lat_end: null,
                        lng_end: null,
                        active: true
                    }
                ],
                interval: 1,
                seen: true
            },
            {
                text: "Sábado",
                dayNumber: 7,
                active: true,
                schedule: [
                    {
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        textBegin: "hh:mm:ss",
                        textEnd: "hh:mm:ss",
                        
                        main_begin: null,
                        main_end: null,
                        window_begin: null,
                        window_end: null,
                        lat_begin: null,
                        lng_begin: null,
                        lat_end: null,
                        lng_end: null,
                        active: true
                    }
                ],
                interval: 1,
                seen: true
            },
            {
                text: "Domingo",
                dayNumber: 1,
                active: true,
                schedule: [
                    {
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        textBegin: "hh:mm:ss",
                        textEnd: "hh:mm:ss",
                        
                        main_begin: null,
                        main_end: null,
                        window_begin: null,
                        window_end: null,
                        lat_begin: null,
                        lng_begin: null,
                        lat_end: null,
                        lng_end: null,
                        active: true
                    }
                ],
                interval: 1,
                seen: true
            },
        ]
    },
    methods: {
        init: function(){
            var i, j, me = this;
            this.actualStep = 0;
            this.allPosVisible = 0;
            this.initMap();
            for(i = 0; i < this.steps.length; i++)
                this.steps[i].schedule = [];
            this.models.usuarioEmpleado.get({
                delimiters: this.id
            },
            function(success){
                me.name.value = success.body.nombre;
                me.email.value = success.body.correo;
                me.phone.value = success.body.telefono;
            },
            function(error){
                console.log(error);
            });
            this.models.empleadoHorario.get({
                delimiters: this.id,
                params: {
                    "per-page": 100,
                    "sort": "hora_inicio"
                }
            },
            function(success){
                var interval = [0, 0, 0, 0, 0, 0, 0];
                for(i = 0; i < success.body.length; i++){
                    interval[success.body[i].dia - 1]++;
                    switch(success.body[i].dia){
                        case 1:     //SUN
                            me.steps[6].schedule.push({
                                id: success.body[i].id,
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin,
                                validBegin: true,
                                textBegin: "hh:mm:ss",
                                main_begin: null,
                                window_begin: null,
                                lat_begin: success.body[i].lat_inicio,
                                lng_begin: success.body[i].lng_inicio,
                                validEnd: true,
                                textEnd: "hh:mm:ss",
                                main_end: null,
                                window_end: null,
                                lat_end: success.body[i].lat_fin,
                                lng_end: success.body[i].lng_fin,
                                active: me.steps[6].schedule.length === 0 ? true : false,
                                remove: false
                            });
                            break;
                        default:
                            me.steps[success.body[i].dia - 2].schedule.push({
                                id: success.body[i].id,
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin,
                                validBegin: true,
                                textBegin: "hh:mm:ss",
                                main_begin: null,
                                window_begin: null,
                                lat_begin: success.body[i].lat_inicio,
                                lng_begin: success.body[i].lng_inicio,
                                validEnd: true,
                                textEnd: "hh:mm:ss",
                                main_end: null,
                                window_end: null,
                                lat_end: success.body[i].lat_fin,
                                lng_end: success.body[i].lng_fin,
                                active: me.steps[success.body[i].dia - 2].schedule.length === 0 ? true : false,
                                remove: false
                            });
                            break;
                    }
                }
                for(i = 0; i < me.steps.length; i++){
                    me.steps[i].active = (i === me.steps.length - 1) ? interval[0] === 0 ? false : true : interval[i + 1] === 0 ? false : true;
                    me.steps[i].interval = (i === me.steps.length - 1) ? interval[0] : interval[i + 1];
                    if(me.steps[i].active)
                        for(j = 0; j < me.steps[i].schedule.length; j++)
                            me.initPosition(i, j);
                }
                me.focusPosition(true);     //JUST ON INIT
            },
            function(error){
                console.log(error);
            });
        },
        initMap: function(){
            var me = this;
            this.map.main = new google.maps.Map(document.getElementById('mapEditResource'), {     //Define Map
                    zoom: this.map.data.zoom
                });
            this.map.main.addListener("click", function(e){       //Define on click listener for map
                me.positioner(e.latLng);
            });
            this.initSearch();
            this.initFocus();
            this.initGeocoder();
        },
        initSearch: function(){
            var me = this;
            var input = document.getElementById('searchEditResource');
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
        initFocus: function(){
            this.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionEditResource'));
        },
        initGeocoder: function(exists){
            var me = this;
            this.map.geocoder = new google.maps.Geocoder();      //Geocoder for fisrt position
            if(exists === 0)
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
        initDirection: function(i, j){
            var me = this;
            this.steps[i].schedule[j].main_begin.addListener("rightclick", function(){
                if(!me.steps[i].schedule[j].window_begin.flag){
                    me.steps[i].schedule[j].window_begin.flag = true;
                    me.map.geocoder.geocode({                          //Geocoder for placing
                        location: {
                            lat: me.steps[i].schedule[j].lat_begin,
                            lng: me.steps[i].schedule[j].lng_begin
                        }
                    },
                    function(response, status){
                        if(status === "OK" && response[0])
                            me.steps[i].schedule[j].window_begin.setContent(response[0].formatted_address);
                        else
                            console.log(status, response);
                    });
                }
                me.steps[i].schedule[j].window_begin.open(me.map.main, me.steps[i].schedule[j].main_begin);
            });
            
            this.steps[i].schedule[j].main_end.addListener("rightclick", function(){
                if(!me.steps[i].schedule[j].window_end.flag){
                    me.steps[i].schedule[j].window_end.flag = true;
                    me.map.geocoder.geocode({                          //Geocoder for placing
                        location: {
                            lat: me.steps[i].schedule[j].lat_end,
                            lng: me.steps[i].schedule[j].lng_end
                        }
                    },
                    function(response, status){
                        if(status === "OK" && response[0])
                            me.steps[i].schedule[j].window_end.setContent(response[0].formatted_address);
                        else
                            console.log(status, response);
                    });
                }
                me.steps[i].schedule[j].window_end.open(me.map.main, me.steps[i].schedule[j].main_end);
            });
        },
        initPosition: function(i, j){
            var me = this;
            this.steps[i].schedule[j].main_begin = new google.maps.Marker({
                map: this.map.main,
                icon: {
                    url: "/image/maps/green-empty.png",
                    labelOrigin: new google.maps.Point(11, 11)
                },
                label: this.map.marker[i].text + (j + 1),
                title: "Inicio del intervalo " + (j + 1) + " para el día " + this.steps[i].text,
                position: {
                    lat: this.steps[i].schedule[j].lat_begin,
                    lng: this.steps[i].schedule[j].lng_begin
                }
            });
            this.deleter("begin", i, j);
            this.steps[i].schedule[j].window_begin = new google.maps.InfoWindow({
                content: "Dirección no encontrada.",
                maxWidth: 175,
                flag: false
            });
            
            this.steps[i].schedule[j].main_end = new google.maps.Marker({
                map: this.map.main,
                icon: {
                    url: "/image/maps/red-empty.png",
                    labelOrigin: new google.maps.Point(11, 11)
                },
                label: this.map.marker[i].text + (j + 1),
                title: "Final del intervalo " + (j + 1) + " para el día " + this.steps[i].text,
                position: {
                    lat: this.steps[i].schedule[j].lat_end,
                    lng: this.steps[i].schedule[j].lng_end
                }
            });
            this.deleter("end", i, j);
            this.steps[i].schedule[j].window_end = new google.maps.InfoWindow({
                content: "Dirección no encontrada.",
                maxWidth: 175,
                flag: false
            });
            
            this.initDirection(i, j);
        },
        initConfiguration: function(auto){
            var i = 0, j;
            if(!auto){
                this.sameConf = !this.sameConf;
                this.steps[0].active = true;
                
                if(this.allPosVisible === 0)
                    this.allPosVisible = 1;
            }
            for(j = 0; j < this.steps[i].schedule.length; j++){
                if(this.steps[i].schedule[j].main_begin !== null &&
                   this.steps[i].schedule[j].lat_begin !== null &&
                   this.steps[i].schedule[j].lng_begin !== null){    //Is showed in map
                    this.steps[i].schedule[j].main_begin.setLabel(this.map.marker[i][this.sameConf ? "textU_begin" : "text"] + (j + 1));
                    this.steps[i].schedule[j].main_begin.setTitle("Inicio del intervalo " + (j + 1) + (this.sameConf ? "" : " para el día " + this.steps[i].text));
                    this.steps[i].schedule[j].main_begin.setMap(this.map.main);
                }
                if(this.steps[i].schedule[j].main_end !== null &&
                   this.steps[i].schedule[j].lat_end !== null &&
                   this.steps[i].schedule[j].lng_end !== null){    //Is showed in map
                    this.steps[i].schedule[j].main_end.setLabel(this.map.marker[i][this.sameConf ? "textU_end" : "text"] + (j + 1));
                    this.steps[i].schedule[j].main_end.setTitle("Final del intervalo " + (j + 1) + (this.sameConf ? "" : " para el día " + this.steps[i].text));
                    this.steps[i].schedule[j].main_end.setMap(this.map.main);
                }
            }
            
            this.setVisibilityPosition(true); //AUTO
        },
        setVisibilityPosition: function(auto){
            var i, j, k, step = this.sameConf ? 0 : this.actualStep;
            if(!auto)
                this.allPosVisible = this.allPosVisible < 2 ? this.allPosVisible + 1 : 0;
            for(i = 0; i < this.steps.length; i++){
                if(this.steps[i].active){
                    k = step;
                    for(j = 0; j < this.steps[i].schedule.length; j++){
                        if(this.steps[i].schedule[j].main_begin !== null &&
                           this.steps[i].schedule[j].lat_begin !== null &&
                           this.steps[i].schedule[j].lng_begin !== null)
                            this.steps[i].schedule[j].main_begin.setMap(this.steps[i].schedule[j].remove ? null : this.allPosVisible === 0 ? this.map.main :
                                                                                  this.allPosVisible === 1 ? (i === k ? this.map.main : null) :
                                                                                  ((i === k && this.steps[i].schedule[j].active) ? this.map.main : null));
                        if(this.steps[i].schedule[j].main_end !== null &&
                           this.steps[i].schedule[j].lat_end !== null &&
                           this.steps[i].schedule[j].lng_end !== null)    //Is showed in map
                            this.steps[i].schedule[j].main_end.setMap(this.steps[i].schedule[j].remove ? null : this.allPosVisible === 0 ? this.map.main :
                                                                                  this.allPosVisible === 1 ? (i === k ? this.map.main : null) :
                                                                                  ((i === k && this.steps[i].schedule[j].active) ? this.map.main : null));
                    }
                }
            }
        },
        getDirection: function(type, pos, step, j){
            var me = this;
            switch(type){
                case "begin":
                    this.steps[step].schedule[j].main_begin.addListener("rightclick", function(){
                        me.steps[step].schedule[j].window_begin.open(me.map.main, me.steps[step].schedule[j].main_begin);
                    });
                    this.steps[step].schedule[j].window_begin = new google.maps.InfoWindow({
                        content: "Dirección no encontrada.",
                        maxWidth: 175
                    });
                    this.map.geocoder.geocode({                          //Geocoder for placing
                        location: pos
                    },
                    function(response, status){
                        if(status === "OK" && response[0])
                            me.steps[step].schedule[j].window_begin.setContent(response[0].formatted_address);
                        else
                            console.log(status, response);
                    });
                    break;
                case "end":
                    this.steps[step].schedule[j].main_end.addListener("rightclick", function(){
                        me.steps[step].schedule[j].window_end.open(me.map.main, me.steps[step].schedule[j].main_end);
                    });
                    this.steps[step].schedule[j].window_end = new google.maps.InfoWindow({
                        content: "Dirección no encontrada.",
                        maxWidth: 175
                    });
                    this.map.geocoder.geocode({                          //Geocoder for placing
                        location: pos
                    },
                    function(response, status){
                        if(status === "OK" && response[0])
                            me.steps[step].schedule[j].window_end.setContent(response[0].formatted_address);
                        else
                            console.log(status, response);
                    });
                    break;
            }
        },
        focusPosition: function(){
            var i, j, k, k2 = false,
                counter = 0,
                totalLat = 0,
                totalLng = 0,
                bounds = new google.maps.LatLngBounds(),
                step = this.sameConf ? 0 : this.actualStep;
            if(this.allPosVisible === 0 && !this.sameConf){
                for(i = 0; i < this.map.marker.length; i++)
                    for(j = 0; j < this.steps[i].schedule.length; j++){
                        if(this.steps[i].schedule[j].main_begin !== null &&
                            this.steps[i].schedule[j].lat_begin !== null &&
                            this.steps[i].schedule[j].lng_begin !== null){
                             counter++;
                             totalLat += this.steps[i].schedule[j].lat_begin;
                             totalLng += this.steps[i].schedule[j].lng_begin;
                             bounds.extend(this.steps[i].schedule[j].main_begin.getPosition());
                             
                            }
                         if(this.steps[i].schedule[j].main_end !== null &&
                            this.steps[i].schedule[j].lat_end !== null &&
                            this.steps[i].schedule[j].lng_end !== null){    //Is showed in map
                             counter++;
                             totalLat += this.steps[i].schedule[j].lat_end;
                             totalLng += this.steps[i].schedule[j].lng_end;
                             bounds.extend(this.steps[i].schedule[j].main_end.getPosition());
                         }
                    }
            }
            else if(this.allPosVisible === 0 && this.sameConf){
                k = 0;
                for(j = 0; j < this.steps[k].schedule.length; j++){
                    if(this.steps[k].schedule[j].main_begin !== null &&
                       this.steps[k].schedule[j].lat_begin !== null &&
                       this.steps[k].schedule[j].lng_begin !== null){
                        counter++;
                        totalLat += this.steps[k].schedule[j].lat_begin;
                        totalLng += this.steps[k].schedule[j].lng_begin;
                        bounds.extend(this.steps[k].schedule[j].main_begin.getPosition());
                        
                       }
                    if(this.steps[k].schedule[j].main_end !== null &&
                       this.steps[k].schedule[j].lat_end !== null &&
                       this.steps[k].schedule[j].lng_end !== null){    //Is showed in map
                        counter++;
                        totalLat += this.steps[k].schedule[j].lat_end;
                        totalLng += this.steps[k].schedule[j].lng_end;
                        bounds.extend(this.steps[k].schedule[j].main_end.getPosition());
                    }
                }
            }
            else if(this.allPosVisible === 1){
                k = step;
                for(j = 0; j < this.steps[k].schedule.length; j++){
                    if(this.steps[k].schedule[j].main_begin !== null &&
                       this.steps[k].schedule[j].lat_begin !== null &&
                       this.steps[k].schedule[j].lng_begin !== null){
                        counter++;
                        totalLat += this.steps[k].schedule[j].lat_begin;
                        totalLng += this.steps[k].schedule[j].lng_begin;
                        bounds.extend(this.steps[k].schedule[j].main_begin.getPosition());
                        
                       }
                    if(this.steps[k].schedule[j].main_end !== null &&
                       this.steps[k].schedule[j].lat_end !== null &&
                       this.steps[k].schedule[j].lng_end !== null){    //Is showed in map
                        counter++;
                        totalLat += this.steps[k].schedule[j].lat_end;
                        totalLng += this.steps[k].schedule[j].lng_end;
                        bounds.extend(this.steps[k].schedule[j].main_end.getPosition());
                    }
                }
            }
            else{
                k = step;
                for(j = 0; j < this.steps[k].schedule.length; j++)
                    if(this.steps[k].schedule[j].active)
                        k2 = j;
                if(k2 !== false &&
                   this.steps[k].schedule[k2].main_begin !== null &&
                   this.steps[k].schedule[k2].lat_begin !== null &&
                   this.steps[k].schedule[k2].lng_begin !== null){
                    counter++;
                    totalLat += this.steps[k].schedule[k2].lat_begin;
                    totalLng += this.steps[k].schedule[k2].lng_begin;
                    bounds.extend(this.steps[k].schedule[k2].main_begin.getPosition());
                    
                   }
                if(k2 !== false &&
                   this.steps[k].schedule[k2].main_end !== null &&
                   this.steps[k].schedule[k2].lat_end !== null &&
                   this.steps[k].schedule[k2].lng_end !== null){    //Is showed in map
                    counter++;
                    totalLat += this.steps[k].schedule[k2].lat_end;
                    totalLng += this.steps[k].schedule[k2].lng_end;
                    bounds.extend(this.steps[k].schedule[k2].main_end.getPosition());
                }
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
        setActiveInterval: function(i){
            var step = this.sameConf ? 0 : this.actualStep;
            for(var j = 0; j < this.steps[step].schedule.length; j++)
                this.steps[step].schedule[j].active = j === i;
            if(this.allPosVisible === 2)
                this.setVisibilityPosition(true); //AUTO
        },
        positioner: function(pos){
            var step = this.sameConf ? 0 : this.actualStep;
            for(var j = 0; j < this.steps[step].schedule.length; j++)
                if(this.steps[step].active && this.steps[step].schedule[j].active){
                    if(this.steps[step].schedule[j].main_begin === null){
                        this.steps[step].schedule[j].main_begin = new google.maps.Marker({
                            map: this.map.main,
                            position: pos,
                            icon: {
                                url: "/image/maps/green-empty.png",
                                labelOrigin: new google.maps.Point(11, 11)
                            },
                            label: this.map.marker[step][this.sameConf ? "textU_begin" : "text"] + (j + 1),
                            title: "Inicio del intervalo " + (j + 1) + (this.sameConf ? "" : " para el día " + this.steps[this.actualStep].text),
                        });
                        this.steps[step].schedule[j].lat_begin = pos.lat();
                        this.steps[step].schedule[j].lng_begin = pos.lng();
                        this.getDirection("begin", pos, step, j);
                        this.deleter("begin", step, j);
                    }
                    else if(this.steps[step].schedule[j].main_begin &&
                            this.steps[step].schedule[j].lat_begin === null &&
                            this.steps[step].schedule[j].lng_begin === null){
                        this.steps[step].schedule[j].main_begin.setMap(this.map.main);
                        this.steps[step].schedule[j].main_begin.setPosition(pos);
                        this.steps[step].schedule[j].main_begin.setLabel(this.map.marker[step][this.sameConf ? "textU_begin" : "text"] + (j + 1));
                        this.steps[step].schedule[j].main_begin.setTitle("Inicio del intervalo " + (j + 1) + (this.sameConf ? "" : " para el día " + this.steps[this.actualStep].text));
                        this.steps[step].schedule[j].lat_begin = pos.lat();
                        this.steps[step].schedule[j].lng_begin = pos.lng();
                    }
                    else if(this.steps[step].schedule[j].main_begin &&
                            this.steps[step].schedule[j].main_end === null){
                        this.steps[step].schedule[j].main_end = new google.maps.Marker({
                            map: this.map.main,
                            position: pos,
                            icon: {
                                url: "/image/maps/red-empty.png",
                                labelOrigin: new google.maps.Point(11, 11)
                            },
                            label: this.map.marker[step][this.sameConf ? "textU_end" : "text"] + (j + 1),
                            title: "Final del intervalo " + (j + 1) + (this.sameConf ? "" : " para el día " + this.steps[this.actualStep].text),
                        });
                        this.steps[step].schedule[j].lat_end = pos.lat();
                        this.steps[step].schedule[j].lng_end = pos.lng();
                        this.getDirection("end", pos, step, j);
                        this.deleter("end", step, j);
                    }
                    else if(this.steps[step].schedule[j].main_end &&
                            this.steps[step].schedule[j].lat_end === null &&
                            this.steps[step].schedule[j].lng_end === null){
                        this.steps[step].schedule[j].main_end.setMap(this.map.main);
                        this.steps[step].schedule[j].main_end.setPosition(pos);
                        this.steps[step].schedule[j].main_end.setLabel(this.map.marker[step][this.sameConf ? "textU_end" : "text"] + (j + 1));
                        this.steps[step].schedule[j].main_end.setTitle("Final del intervalo " + (j + 1) + (this.sameConf ? "" : " para el día " + this.steps[this.actualStep].text));
                        this.steps[step].schedule[j].lat_end = pos.lat();
                        this.steps[step].schedule[j].lng_end = pos.lng();
                    }
                }
        },
        deleter: function(type, i, j){
            var me = this;
            if(type === "begin")
                this.steps[i].schedule[j].main_begin.addListener("dblclick", function(){
                    me.steps[i].schedule[j].main_begin.setMap(null);
                    me.steps[i].schedule[j].lat_begin = null;
                    me.steps[i].schedule[j].lng_begin = null;
                });
            else if(type === "end")
                this.steps[i].schedule[j].main_end.addListener("dblclick", function(){
                    me.steps[i].schedule[j].main_end.setMap(null);
                    me.steps[i].schedule[j].lat_end = null;
                    me.steps[i].schedule[j].lng_end = null;
                });
        },
        changeStep: function(e){
            this.actualStep = e;
            this.steps[e].seen = true;
            
            if(this.allPosVisible > 0)
                this.setVisibilityPosition(true); //AUTO
        },
        setInterval: function(){
            var step = this.sameConf ? 0 : this.actualStep;
            var i,
                interval = Math.floor(parseInt(this.steps[step].interval)) <= this.maxInterval ? Math.floor(parseInt(this.steps[step].interval)) : this.maxInterval,
                length = this.steps[step].schedule.length;
            if(!isNaN(Math.floor(parseInt(this.steps[step].interval)))){
                if(length < interval){
                    for(i = 0; i < interval - length; i++)
                        this.steps[step].schedule.push({
                            id: null,
                            begin: "",
                            end: "",
                            validBegin: true,
                            validEnd: true,
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
                            
                            main_begin: null,
                            main_end: null,
                            window_begin: null,
                            window_end: null,
                            lat_begin: null,
                            lng_begin: null,
                            lat_end: null,
                            lng_end: null,
                            active: false,
                            remove: false
                        });
                }
                else if(length > interval){
                    for(i = 0; i < length; i++){
                        if(i >= interval)
                            this.steps[step].schedule[i].remove = true;
                        else
                            this.steps[step].schedule[i].remove = false;
                    }
                }
                else
                    for(i = 0; i < length; i++)
                        this.steps[step].schedule[i].remove = false;
                this.setActivity(true);
                if(this.steps[step].schedule.length > 0)
                    this.setActiveInterval(0);
            }
        },
        setActivity: function(auto){
            if(!auto)
                this.steps[this.actualStep].active = !this.steps[this.actualStep].active;
            if(!this.steps[this.actualStep].active){
                for(var j = 0; j < this.steps[this.actualStep].schedule.length; j++){
                    if(this.steps[this.actualStep].schedule[j].main_begin !== null &&
                       this.steps[this.actualStep].schedule[j].lat_begin !== null &&
                       this.steps[this.actualStep].schedule[j].lng_begin !== null)
                        this.steps[this.actualStep].schedule[j].main_begin.setMap(null);
                    if(this.steps[this.actualStep].schedule[j].main_end !== null &&
                       this.steps[this.actualStep].schedule[j].lat_end !== null &&
                       this.steps[this.actualStep].schedule[j].lng_end !== null)    //Is showed in map
                        this.steps[this.actualStep].schedule[j].main_end.setMap(null);
                }
            }
            else 
                this.setVisibilityPosition(true); //AUTO
        },
        validation: function(type, i){
            var step = this.sameConf ? 0 : this.actualStep;
            switch(type){
                case "name":
                    this.name.valid = false;
                    if(this.name.value === null ||
                       this.name.value === "")
                        this.name.text = "Nombre no puede estar vacío";
                    else if(this.name.value.length < 8)
                        this.name.text = "Nombre debe contener al menos 8 caracteres";
                    else{
                        this.name.text = "";
                        this.name.valid = true;
                    }
                    break;
                case "email":
                    var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    this.email.valid = false;
                    if(this.email.value === null ||
                       this.email.value === "")
                        this.email.text = "Correo electrónico no puede estar vacío";
                    else if(!emailTest.test(this.email.value))
                        this.email.text = "Correo electrónico no tiene una forma válida";
                    else{
                        this.email.text = "";
                        this.email.valid = true;
                    }
                    break;
                case "pass":
                    this.pass.valid = false;
                    if(this.pass.value === null ||
                       this.pass.value === "")
                        this.pass.text = "Contraseña no puede estar vacío";
                    else if(this.pass.value.length < 8)
                        this.pass.text = "Contraseña debe contener al menos 8 caracteres";
                    else{
                        this.pass.text = "";
                        this.pass.valid = true;
                    }
                    break;
                case "repass":
                    this.repass.valid = false;
                    if(this.repass.value === null ||
                       this.repass.value === "")
                        this.repass.text = "Confirmar contraseña no puede estar vacío";
                    else if(this.repass.value !== this.pass.value)
                        this.repass.text = "Las contraseñas no coinciden";
                    else{
                        this.repass.text = "";
                        this.repass.valid = true;
                    }
                    break;
                case "phone":
                    this.phone.valid = false;
                    if(this.phone.value === null ||
                       this.phone.value === "")
                        this.phone.text = "Teléfono no puede estar vacío";
                    else if(this.phone.value.length < 10)
                        this.phone.text = "Teléfono debe contener al menos 10 dígitos";
                    else if(this.phone.value.length > 13)
                        this.phone.text = "Teléfono debe contener como máximo 13 dígitos";
                    else{
                        this.phone.text = "";
                        this.phone.valid = true;
                    }
                    break;
                case "time-begin":
                    this.steps[step].schedule[i].validBegin = false;
                    if(this.steps[step].schedule[i].begin === "")
                        this.steps[step].schedule[i].textBegin = "El inicio del intervalo no puede estar vacío";
                    else if(this.steps[step].schedule[i].begin.length !== 8)
                        this.steps[step].schedule[i].textBegin = "El inicio del intervalo no tiene un formato apropiado";
                    else{
                        this.steps[step].schedule[i].textBegin = "hh:mm:ss";
                        this.steps[step].schedule[i].validBegin = true;
                    }
                    break;
                case "time-end":
                    this.steps[step].schedule[i].validEnd = false;
                    if(this.steps[step].schedule[i].end === "")
                        this.steps[step].schedule[i].textEnd = "El final del intervalo no puede estar vacío";
                    else if(this.steps[step].schedule[i].end.length !== 8)
                        this.steps[step].schedule[i].textEnd = "El final del intervalo no tiene un formato apropiado";
                    else{
                        this.steps[step].schedule[i].textEnd = "hh:mm:ss";
                        this.steps[step].schedule[i].validEnd = true;
                    }
                    break;
            }
        },
        submit: function(){
            var me = this,
                i, j, k = 0, limit = 4,
                hmdB, hmdE,
                error = "",
                valid = true,
                emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(this.name.value === null || this.name.value === ""){     //No name
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Nombre no puede estar vacío.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.name.valid = false;
                this.name.text = "Nombre no puede estar vacío";
                valid = false;
            }
            else if(valid && this.name.value.length < 8){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Nombre debe contener al menos 8 caracteres.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.name.valid = false;
                this.name.text = "Nombre debe contener al menos 8 caracteres";
                valid = false;
            }
            else if(valid && (this.email.value === null || this.email.value === "")){     //No name
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Correo electrónico no puede estar vacío.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.email.valid = false;
                this.email.text = "Correo electrónico no puede estar vacío";
                valid = false;
            }
            else if(valid && !emailTest.test(this.email.value)){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Correo electrónico no tiene una forma válida.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.email.valid = false;
                this.email.text = "Correo electrónico no tiene una forma válida";
                valid = false;
            }
            else if(valid && (this.phone.value === null || this.phone.value === "")){     //No name
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Teléfono no puede estar vacío.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.phone.valid = false;
                this.phone.text = "Teléfono no puede estar vacío";
                valid = false;
            }
            else if(valid && this.phone.value.length < 10){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Teléfono debe contener al menos 10 dígitos.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.phone.valid = false;
                this.phone.text = "Teléfono debe contener al menos 10 dígitos";
                valid = false;
            }
            else if(valid && this.phone.value.length > 13){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Teléfono debe contener como máximo 13 dígitos.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.phone.valid = false;
                this.phone.text = "Teléfono debe contener como máximo 13 dígitos";
                valid = false;
            }
            else if(valid){
                for(i = 0; i < (this.sameConf ? 1 : this.steps.length); i++){
                    if(this.steps[i].active)
                        for(j = 0; j < this.steps[i].schedule.length; j++)
                            if(this.steps[i].schedule[j].main_begin === null ||                  //No position
                                this.steps[i].schedule[j].lat_begin === null ||
                                this.steps[i].schedule[j].lng_begin === null ||
                                this.steps[i].schedule[j].main_end === null ||                  //No position
                                this.steps[i].schedule[j].lat_end === null ||
                                this.steps[i].schedule[j].lng_end === null){
                                error += (k <= limit) ? "Debes escoger las ubicaciones de inicio y final del intervalo " + (j + 1) + (this.sameConf ? "" : " para el día " + this.steps[i].text) + ".<br>": "";
                                valid = false; k++;
                         }
                }
                if(valid){
                    error = "";
                    k = 0;
                    for(i = 0; i < (this.sameConf ? 1 : this.steps.length); i++)
                        if(this.steps[i].active && this.steps[i].schedule.length > 0)
                            for(j = 0; j < this.steps[i].schedule.length; j++){
                                hmdB = this.steps[i].schedule[j].begin.split(":");
                                hmdE = this.steps[i].schedule[j].end.split(":");
                                this.steps[i].schedule[j].validBegin = true;
                                this.steps[i].schedule[j].validEnd = true;
                                this.steps[i].schedule[j].textBegin = "hh:mm:ss";
                                this.steps[i].schedule[j].textEnd = "hh:mm:ss";
                                if(this.steps[i].schedule[j].begin === ""){
                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + (this.sameConf ? "" : " en el día " + this.steps[i].text) + " no puede estar vacío.<br>" : "";
                                    this.steps[i].schedule[j].validBegin = false;
                                    this.steps[i].schedule[j].textBegin = "El inicio del intervalo no puede estar vacío";
                                    valid = false; k++;
                                }
                                if(this.steps[i].schedule[j].end === ""){
                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + (this.sameConf ? " " : " en el día " + this.steps[i].text) + " no puede estar vacío.<br>" : "";
                                    this.steps[i].schedule[j].validEnd = false;
                                    this.steps[i].schedule[j].textEnd = "El final del intervalo no puede estar vacío";
                                    valid = false; k++;
                                }
                                if(this.steps[i].schedule[j].begin !== "" &&
                                   (this.steps[i].schedule[j].begin > "23:59:59" ||
                                    hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59)){
                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + (this.sameConf ? "" : " en el día " + this.steps[i].text) + " no tiene un formato apropiado.<br>" : "";
                                    this.steps[i].schedule[j].validBegin = false;
                                    this.steps[i].schedule[j].textBegin = "El inicio del intervalo no tiene un formato apropiado";
                                    valid = false; k++;
                                }
                                if(this.steps[i].schedule[j].end !== "" &&
                                   (this.steps[i].schedule[j].end > "23:59:59" ||
                                    hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59)){
                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + (this.sameConf ? "" : " en el día " + this.steps[i].text) + " no tiene un formato apropiado.<br>" : "";
                                    this.steps[i].schedule[j].validEnd = false;
                                    this.steps[i].schedule[j].textEnd = "El final del intervalo no tiene un formato apropiado";
                                    valid = false; k++;
                                }
                                if(this.steps[i].schedule[j].begin !== "" &&
                                   this.steps[i].schedule[j].end !== "" &&
                                   this.steps[i].schedule[j].begin >= this.steps[i].schedule[j].end){
                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + " debe ser mayor al inicio del mismo" + (this.sameConf ? "" : " en el día " + this.steps[i].text) + ".<br>" : "";
                                    this.steps[i].schedule[j].validBegin = false;
                                    this.steps[i].schedule[j].validEnd = false;
                                    this.steps[i].schedule[j].textBegin = "El inicio del intervalo debe ser menor al final del mismo";
                                    this.steps[i].schedule[j].textEnd = "El final del intervalo debe ser mayor al inicio del mismo";
                                    valid = false; k++;
                                }
                                if(j > 0 &&
                                   this.steps[i].schedule[j].begin !== "" &&
                                   this.steps[i].schedule[j - 1].end !== "" &&
                                   this.steps[i].schedule[j].begin <= this.steps[i].schedule[j - 1].end){
                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " debe ser mayor al final del intervalo " + j + (this.sameConf ? "" : " en el día " + this.steps[i].text) + ".<br>": "";
                                    this.steps[i].schedule[j].validBegin = false;
                                    this.steps[i].schedule[j - 1].validEnd = false;
                                    this.steps[i].schedule[j].textBegin = "El inicio del intervalo debe ser mayor al final del intervalo anterior";
                                    this.steps[i].schedule[j - 1].textEnd = "El final del intervalo debe ser menor al inicio del intervalo posterior";
                                    valid = false; k++;
                                }
                            }
                }
                else{
                    BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                    BUTO.components.main.alert.description.text = error;
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                }
                if(valid){
                    this.models.usuarioEmpleado.patch({
                        delimiters: this.id,
                        params: {
                            nombre: this.name.value,
                            correo: this.email.value,
                            telefono: this.phone.value
                        }
                    },function(success){
                        for(i = 0; i < me.steps.length; i++)
                            for(j = 0; j < me.steps[i].schedule.length; j++){
                                if(!me.steps[i].active)
                                    me.steps[i].schedule[j].remove = true;
                                me.submitSchedule(i, j, success.body.id);
                            }
                        BUTO.components.main.children.recursosRegistrados.grid.updatePagination();
                        BUTO.components.main.alert.description.title = "Edición de Recurso Humano";
                        BUTO.components.main.alert.description.text = "Se ha editado correctamente el recurso humano '" + success.body.nombre + "'";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    },
                    function(error){
                        BUTO.components.main.alert.description.title = "Errores en Edición de Registro";
                        BUTO.components.main.alert.description.text = "";
                        if(error.body.length > 0)
                            for(var k = 0; k < error.body.length; k++){
                                BUTO.components.main.alert.description.text += error.body[k].message + "<br>";
                                switch(error.body[k].field){
                                    case "nombre":
                                        me.name.valid = false;
                                        me.name.text = error.body[k].message;
                                        break;
                                    case "correo":
                                        me.email.valid = false;
                                        me.email.text = error.body[k].message;
                                        break;
                                }
                            }
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    });
                }
                else{
                    BUTO.components.main.alert.description.title = "Errores en Edición Registro";
                    BUTO.components.main.alert.description.text = (k <= limit) ? error : error + "<br>...";
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                }
            }
        },
        submitSchedule: function(i, j, id){
            var me = this;
            if(this.steps[i].schedule[j].id !== null && this.steps[i].schedule[j].remove === true){ //Lets delete this schedule
                this.models.empleadoHorario.remove({
                    delimiters: [
                        id,
                        this.steps[i].schedule[j].id
                    ],
                    params: {
                        
                    }
                },
                function(success){
                    me.steps[i].schedule[j].id = null;
                },
                function(error){
                    console.log(error);
                });
            }
            else if(this.steps[i].schedule[j].id !== null && this.steps[i].schedule[j].remove === false){ //Lets edit this schedule
                this.models.empleadoHorario.patch({
                    delimiters: [
                        id,
                        this.steps[i].schedule[j].id
                    ],
                    params: {
                        dia: this.steps[i].dayNumber,
                        hora_inicio: this.steps[i].schedule[j].begin,
                        hora_fin: this.steps[i].schedule[j].end,
                        lat_inicio: this.steps[i].schedule[j].lat_begin,
                        lat_fin: this.steps[i].schedule[j].lat_end,
                        lng_inicio: this.steps[i].schedule[j].lng_begin,
                        lng_fin: this.steps[i].schedule[j].lng_end
                    }
                },
                function(success){
                    
                },
                function(error){
                    console.log(error);
                    me.submitSchedule(i, j, id);
                });
            }
            else if(this.steps[i].schedule[j].id === null && this.steps[i].schedule[j].remove === false){ //Lets create this schedule
                this.models.empleadoHorario.post({
                    delimiters: id,
                    params: {
                        dia: this.steps[i].dayNumber,
                        hora_inicio: this.steps[i].schedule[j].begin,
                        hora_fin: this.steps[i].schedule[j].end,
                        lat_inicio: this.steps[i].schedule[j].lat_begin,
                        lat_fin: this.steps[i].schedule[j].lat_end,
                        lng_inicio: this.steps[i].schedule[j].lng_begin,
                        lng_fin: this.steps[i].schedule[j].lng_end
                    }
                },
                function(success){
                    me.steps[i].schedule[j].id = success.body.id;
                },
                function(error){
                    console.log(error);
                    me.submitSchedule(i, j, id);
                });
            }
        }
    }
});