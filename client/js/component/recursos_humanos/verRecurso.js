module.exports = new Vue({
    data: {
        id: null,
        name: null,
        email: null,
        date: null,
        models: {
            usuarioEmpleado: null,
            empleado: null,
            empleadoHorario: null
        },
        map: {
            main: null,
            geocoder: null,
            marker: [
                {
                    main_begin: null,
                    main_end: null,
                    text: "Lu",
                    lat_begin: null,
                    lng_begin: null,
                    lat_end: null,
                    lng_end: null
                },
                {
                    main_begin: null,
                    main_end: null,
                    text: "Ma",
                    lat_begin: null,
                    lng_begin: null,
                    lat_end: null,
                    lng_end: null
                },
                {
                    main_begin: null,
                    main_end: null,
                    text: "Mi",
                    lat_begin: null,
                    lng_begin: null,
                    lat_end: null,
                    lng_end: null
                },
                {
                    main_begin: null,
                    main_end: null,
                    text: "Ju",
                    lat_begin: null,
                    lng_begin: null,
                    lat_end: null,
                    lng_end: null
                },
                {
                    main_begin: null,
                    main_end: null,
                    text: "Vi",
                    lat_begin: null,
                    lng_begin: null,
                    lat_end: null,
                    lng_end: null
                },
                {
                    main_begin: null,
                    main_end: null,
                    text: "Sa",
                    lat_begin: null,
                    lng_begin: null,
                    lat_end: null,
                    lng_end: null
                },
                {
                    main_begin: null,
                    main_end: null,
                    text: "Do",
                    lat_begin: null,
                    lng_begin: null,
                    lat_end: null,
                    lng_end: null
                }
            ],
            data: {
                address: "Chilpancingo_1_2, Hipódromo",
                zoom: 18
            }
        },
        allPosVisible: true,
        actualStep: 0,
        steps: [
            {
                text: "Lunes",
                dayNumber: 2,
                active: true,
                schedule: [],
                interval: 1,
                seen: true
            },
            {
                text: "Martes",
                dayNumber: 3,
                active: true,
                schedule: [],
                interval: 1,
                seen: true
            },
            {
                text: "Miércoles",
                dayNumber: 4,
                active: true,
                schedule: [],
                interval: 1,
                seen: true
            },
            {
                text: "Jueves",
                dayNumber: 5,
                active: true,
                schedule: [],
                interval: 1,
                seen: true
            },
            {
                text: "Viernes",
                dayNumber: 6,
                active: true,
                schedule: [],
                interval: 1,
                seen: true
            },
            {
                text: "Sábado",
                dayNumber: 7,
                active: true,
                schedule: [],
                interval: 1,
                seen: true
            },
            {
                text: "Domingo",
                dayNumber: 1,
                active: true,
                schedule: [],
                interval: 1,
                seen: true
            },
        ]
    },
    methods: {
        init: function(){
            var me = this;
            this.actualStep = 0;
            this.allPosVisible = true;
            this.initMap();
            for(var i = 0; i < me.steps.length; i++){
                this.steps[i].schedule = [];
                this.map.marker[i].main_begin = null;
                this.map.marker[i].lat_begin = null;
                this.map.marker[i].lng_begin = null;
                this.map.marker[i].main_end = null;
                this.map.marker[i].lat_end = null;
                this.map.marker[i].lng_end = null;
            }
            this.models.usuarioEmpleado.get({
                delimiters: this.id
            },
            function(success){
                me.name = success.body.nombre;
                me.email = success.body.correo;
                me.date = success.body.fecha_ingreso;
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
                            if(me.map.marker[6].lat_begin === null)
                                me.map.marker[6].lat_begin = success.body[i].lat_inicio;
                            if(me.map.marker[6].lng_begin === null)
                                me.map.marker[6].lng_begin = success.body[i].lng_inicio;
                            if(me.map.marker[6].lat_end === null)
                                me.map.marker[6].lat_end = success.body[i].lat_fin;
                            if(me.map.marker[6].lng_end === null)
                                me.map.marker[6].lng_end = success.body[i].lng_fin;
                            me.steps[6].schedule.push({
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin
                            });
                            break;
                        default:
                            if(me.map.marker[success.body[i].dia - 2].lat_begin === null)
                                me.map.marker[success.body[i].dia - 2].lat_begin = success.body[i].lat_inicio;
                            if(me.map.marker[success.body[i].dia - 2].lng_begin === null)
                                me.map.marker[success.body[i].dia - 2].lng_begin = success.body[i].lng_inicio;
                            if(me.map.marker[success.body[i].dia - 2].lat_end === null)
                                me.map.marker[success.body[i].dia - 2].lat_end = success.body[i].lat_fin;
                            if(me.map.marker[success.body[i].dia - 2].lng_end === null)
                                me.map.marker[success.body[i].dia - 2].lng_end = success.body[i].lng_fin;
                            me.steps[success.body[i].dia - 2].schedule.push({
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin
                            });
                            break;
                    }
                }
                for(i = 0; i < me.steps.length; i++){
                    me.steps[i].active = (i === me.steps.length - 1) ? interval[0] === 0 ? false : true : interval[i + 1] === 0 ? false : true;
                    me.steps[i].interval = (i === me.steps.length - 1) ? interval[0] : interval[i + 1];
                    if(me.steps[i].active)
                        me.initPosition(i);
                }
                me.focusPosition(true);     //JUST ON INIT
            },
            function(error){
                console.log(error);
            });
        },
        initMap: function(){
            this.map.main = new google.maps.Map(document.getElementById('mapSeeResource'), {     //Define Map
                zoom: this.map.data.zoom
            });
            this.initFocus();
        },
        initFocus: function(){
            this.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionSeeResource'));
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
        initPosition: function(i){
            this.map.marker[i].main_begin = new google.maps.Marker({
                map: this.map.main,
                icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.map.marker[i].text + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1",
                position: {
                    lat: this.map.marker[i].lat_begin,
                    lng: this.map.marker[i].lng_begin,
                }
            });
            this.map.marker[i].main_end = new google.maps.Marker({
                map: this.map.main,
                icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.map.marker[i].text + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1",
                position: {
                    lat: this.map.marker[i].lat_end,
                    lng: this.map.marker[i].lng_end,
                }
            });
        },
        initConfiguration: function(){
            var i;
            for(i = 0; i < this.map.marker.length; i++){
                if(this.map.marker[i].main_begin !== null &&
                   this.map.marker[i].lat_begin !== null &&
                   this.map.marker[i].lng_begin !== null)    //Is showed in map
                    this.map.marker[i].main_begin.setMap(this.map.main);
                if(this.map.marker[i].main_end !== null &&
                   this.map.marker[i].lat_end !== null &&
                   this.map.marker[i].lng_end !== null)    //Is showed in map
                    this.map.marker[i].main_end.setMap(this.map.main);
            }
            
            if(!this.allPosVisible)
                this.setVisibilityPosition(true); //AUTO
        },
        setVisibilityPosition: function(auto){
            var i;
            if(!auto)
                this.allPosVisible = !this.allPosVisible;
            for(i = 0; i < this.map.marker.length; i++){
                if(this.map.marker[i].main_begin !== null &&
                   this.map.marker[i].lat_begin !== null &&
                   this.map.marker[i].lng_begin !== null)
                    this.map.marker[i].main_begin.setMap(this.allPosVisible ? this.map.main : (i === this.actualStep) ? this.map.main : null);
                if(this.map.marker[i].main_end !== null &&
                   this.map.marker[i].lat_end !== null &&
                   this.map.marker[i].lng_end !== null)    //Is showed in map
                    this.map.marker[i].main_end.setMap(this.allPosVisible ? this.map.main : (i === this.actualStep) ? this.map.main : null);
            }
        },
        focusPosition: function(a){
            var i,
                counter = 0,
                totalLat = 0,
                totalLng = 0,
                bounds = new google.maps.LatLngBounds();
            if(this.allPosVisible)
                for(i = 0; i < this.map.marker.length; i++){
                    if(this.map.marker[i].main_begin !== null &&
                       this.map.marker[i].lat_begin !== null &&
                       this.map.marker[i].lng_begin !== null){
                        counter++;
                        totalLat += this.map.marker[i].lat_begin;
                        totalLng += this.map.marker[i].lng_begin;
                        bounds.extend(this.map.marker[i].main_begin.getPosition());
                        
                       }
                    if(this.map.marker[i].main_end !== null &&
                       this.map.marker[i].lat_end !== null &&
                       this.map.marker[i].lng_end !== null){    //Is showed in map
                        counter++;
                        totalLat += this.map.marker[i].lat_end;
                        totalLng += this.map.marker[i].lng_end;
                        bounds.extend(this.map.marker[i].main_end.getPosition());
                    }
                }
            else{
                i = this.actualStep;
                if(this.map.marker[i].main_begin !== null &&
                    this.map.marker[i].lat_begin !== null &&
                    this.map.marker[i].lng_begin !== null){
                     counter++;
                     totalLat += this.map.marker[i].lat_begin;
                     totalLng += this.map.marker[i].lng_begin;
                     bounds.extend(this.map.marker[i].main_begin.getPosition());
                     
                    }
                 if(this.map.marker[i].main_end !== null &&
                    this.map.marker[i].lat_end !== null &&
                    this.map.marker[i].lng_end !== null){    //Is showed in map
                     counter++;
                     totalLat += this.map.marker[i].lat_end;
                     totalLng += this.map.marker[i].lng_end;
                     bounds.extend(this.map.marker[i].main_end.getPosition());
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
            else if(a)
                this.initGeocoder();
        },
        changeStep: function(e){
            this.actualStep = e;
            this.steps[e].seen = true;
            
            if(!this.allPosVisible)
                this.setVisibilityPosition(true); //AUTO
        }
    }
});