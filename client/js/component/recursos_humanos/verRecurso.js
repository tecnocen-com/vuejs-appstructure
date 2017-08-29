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
                    text: "Lu"
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
                address: "Chilpancingo_1_2, Hipódromo",
                zoom: 18
            }
        },
        allPosVisible: 0,
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
        init: function(type, first){
            var i, j, me = this;
            this.actualStep = 0;
            this.allPosVisible = 0;
            if(type !== "modal")
                this.initMap(type, first);
            else
                setTimeout(function(){
                    me.initMap(type, first);
                }, 250);
            for(i = 0; i < this.steps.length; i++)
                this.steps[i].schedule = [];
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
                            me.steps[6].schedule.push({
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin,
                                main_begin: null,
                                lat_begin: success.body[i].lat_inicio,
                                lng_begin: success.body[i].lng_inicio,
                                main_end: null,
                                lat_end: success.body[i].lat_fin,
                                lng_end: success.body[i].lng_fin,
                                active: me.steps[6].schedule.length === 0 ? true : false
                            });
                            break;
                        default:
                            me.steps[success.body[i].dia - 2].schedule.push({
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin,
                                main_begin: null,
                                lat_begin: success.body[i].lat_inicio,
                                lng_begin: success.body[i].lng_inicio,
                                main_end: null,
                                lat_end: success.body[i].lat_fin,
                                lng_end: success.body[i].lng_fin,
                                active: me.steps[success.body[i].dia - 2].schedule.length === 0 ? true : false
                            });
                            break;
                    }
                }
                if(type === "modal"){
                    setTimeout(function(){
                        for(i = 0; i < me.steps.length; i++){
                            me.steps[i].active = (i === me.steps.length - 1) ? interval[0] === 0 ? false : true : interval[i + 1] === 0 ? false : true;
                            me.steps[i].interval = (i === me.steps.length - 1) ? interval[0] : interval[i + 1];
                            if(me.steps[i].active)
                                for(j = 0; j < me.steps[i].schedule.length; j++)
                                    me.initPosition(i, j);
                        }
                        me.focusPosition(true);     //JUST ON INIT
                    }, 250);
                }
                else{
                    for(i = 0; i < me.steps.length; i++){
                        me.steps[i].active = (i === me.steps.length - 1) ? interval[0] === 0 ? false : true : interval[i + 1] === 0 ? false : true;
                        me.steps[i].interval = (i === me.steps.length - 1) ? interval[0] : interval[i + 1];
                        if(me.steps[i].active)
                            for(j = 0; j < me.steps[i].schedule.length; j++)
                                me.initPosition(i, j);
                    }
                    me.focusPosition(true);     //JUST ON INIT
                }
            },
            function(error){
                console.log(error);
            });
        },
        initMap: function(type, first){
            if(type !== "modal" || (type === "modal" && first))
                this.map.main = new google.maps.Map(document.getElementById('mapSeeResource'), {     //Define Map
                    zoom: this.map.data.zoom
                });
            if(type !== "modal" || first)
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
        initPosition: function(i, j){
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
        },
        setVisibilityPosition: function(auto){
            var i, j, k;
            if(!auto)
                this.allPosVisible = this.allPosVisible < 2 ? this.allPosVisible + 1 : 0;
            for(i = 0; i < this.steps.length; i++){
                if(this.steps[i].active){
                    k = this.sameConf ? 0 : this.actualStep;
                    for(j = 0; j < this.steps[i].schedule.length; j++){
                        if(this.steps[i].schedule[j].main_begin !== null &&
                           this.steps[i].schedule[j].lat_begin !== null &&
                           this.steps[i].schedule[j].lng_begin !== null)
                            this.steps[i].schedule[j].main_begin.setMap(this.allPosVisible === 0 ? this.map.main :
                                                                                  this.allPosVisible === 1 ? (i === k ? this.map.main : null) :
                                                                                  ((i === k && this.steps[i].schedule[j].active) ? this.map.main : null));
                        if(this.steps[i].schedule[j].main_end !== null &&
                           this.steps[i].schedule[j].lat_end !== null &&
                           this.steps[i].schedule[j].lng_end !== null)    //Is showed in map
                            this.steps[i].schedule[j].main_end.setMap(this.allPosVisible === 0 ? this.map.main :
                                                                                  this.allPosVisible === 1 ? (i === k ? this.map.main : null) :
                                                                                  ((i === k && this.steps[i].schedule[j].active) ? this.map.main : null));
                    }
                }
            }
        },
        focusPosition: function(a){
            var i, j, k, k2 = false,
                counter = 0,
                totalLat = 0,
                totalLng = 0,
                bounds = new google.maps.LatLngBounds();
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
                k = this.sameConf ? 0 : this.actualStep;
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
                k = this.sameConf ? 0 : this.actualStep;
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
            else if(a)
                this.initGeocoder();
        },
        setActiveInterval: function(i){
            for(var j = 0; j < this.steps[this.sameConf ? 0 : this.actualStep].schedule.length; j++)
                this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].active = j === i;
            if(this.allPosVisible === 2)
                this.setVisibilityPosition(true); //AUTO
        },
        changeStep: function(e){
            this.actualStep = e;
            this.steps[e].seen = true;
            
            if(this.allPosVisible > 0)
                this.setVisibilityPosition(true); //AUTO
        }
    }
});