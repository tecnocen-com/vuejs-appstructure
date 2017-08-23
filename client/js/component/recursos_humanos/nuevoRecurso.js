module.exports = new Vue({
    data: {
        test: 0,
        models: {
            usuarioEmpleado: null,
            empleado: null,
            empleadoHorario: null
        },
        typeSelection: {
            type: 1,    //null
            options: [
                {
                    value: 0,
                    text: "Importación de datos"
                },
                {
                    value: 1,
                    text: "Agregado manual"
                }
            ]
        },
        manualAdd: {
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
            date: {
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
                    address: "Chilpancingo_1_2, Hipódromo",
                    zoom: 18
                }
            },
            sameConf: false,
            allPosVisible: true,
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
                            lat_begin: null,
                            lng_begin: null,
                            lat_end: null,
                            lng_end: null,
                            active: true
                        }
                    ],
                    interval: 1,
                    seen: false
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
                            lat_begin: null,
                            lng_begin: null,
                            lat_end: null,
                            lng_end: null,
                            active: true
                        }
                    ],
                    interval: 1,
                    seen: false
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
                            lat_begin: null,
                            lng_begin: null,
                            lat_end: null,
                            lng_end: null,
                            active: true
                        }
                    ],
                    interval: 1,
                    seen: false
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
                            lat_begin: null,
                            lng_begin: null,
                            lat_end: null,
                            lng_end: null,
                            active: true
                        }
                    ],
                    interval: 1,
                    seen: false
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
                            lat_begin: null,
                            lng_begin: null,
                            lat_end: null,
                            lng_end: null,
                            active: true
                        }
                    ],
                    interval: 1,
                    seen: false
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
                            lat_begin: null,
                            lng_begin: null,
                            lat_end: null,
                            lng_end: null,
                            active: true
                        }
                    ],
                    interval: 1,
                    seen: false
                },
            ]
        }
    },
    methods: {
        init: function(e){
            var me = this;
            if(e){
                this.models.usuarioEmpleado = e.usuarioEmpleado;
                this.models.empleado = e.empleado;
                this.models.empleadoHorario = e.empleadoHorario;
            }
            else if(this.typeSelection.type === 1)
                Vue.nextTick(function(){
                    me.initMap();
                });
        },
        mainSelect: function(e){
            var me = this;
            this.typeSelection.type = e;
            if(e === 1)
                Vue.nextTick(function(){
                    me.initMap();
                });
        },
        initMap: function(){
            var me = this;
            this.manualAdd.map.main = new google.maps.Map(document.getElementById('mapAddResource'), {     //Define Map
                zoom: this.manualAdd.map.data.zoom
            });
            this.manualAdd.map.main.addListener("click", function(e){       //Define on click listener for map
                me.positioner(e.latLng);
            });
            this.initGeocoder();
            this.initConfiguration(true);
            this.initSearch();
            this.initFocus();
        },
        initFocus: function(){
            this.manualAdd.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionAddResource'));
        },
        initSearch: function(){
            var me = this;
            var input = document.getElementById('searchAddResource');
            var searchBox = new google.maps.places.SearchBox(input);
            this.manualAdd.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    
            // Bias the SearchBox results towards current map's viewport.
            this.manualAdd.map.main.addListener('bounds_changed', function() {
              searchBox.setBounds(me.manualAdd.map.main.getBounds());
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
                me.manualAdd.map.main.fitBounds(bounds);
            });
        },
        initGeocoder: function(){
            var me = this;
            this.manualAdd.map.geocoder = new google.maps.Geocoder();      //Geocoder for fisrt position
            this.manualAdd.map.geocoder.geocode({                          //Geocoder for placing
                address: this.manualAdd.map.data.address
            },
            function(response, status){
                if(status === "OK")
                    me.manualAdd.map.main.setCenter(response[0].geometry.location);
                else
                    console.log(status);
            });
        },
        initConfiguration: function(auto){
            var i, j;
            if(!auto){
                this.manualAdd.sameConf = !this.manualAdd.sameConf;
                this.manualAdd.steps[0].active = true;
            }
            for(i = 0; i < this.manualAdd.steps.length; i++){
                for(j = 0; j < this.manualAdd.steps[i].schedule; j++){
                    if(this.manualAdd.steps[i].schedule[j].main_begin !== null &&
                       this.manualAdd.steps[i].schedule[j].lat_begin !== null &&
                       this.manualAdd.steps[i].schedule[j].lng_begin !== null){    //Is showed in map
                        if(i === 0){    //Is designed one for all
                            this.manualAdd.steps[i].schedule[j].main_begin.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.manualAdd.map.marker[i][this.manualAdd.sameConf ? "textU_begin" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                            this.manualAdd.steps[i].schedule[j].main_begin.setMap(this.manualAdd.map.main);
                        }
                        else           //All irrelevants
                            this.manualAdd.steps[i].schedule[j].main_begin.setMap(this.manualAdd.sameConf ? null : this.manualAdd.map.main);
                    }
                    if(this.manualAdd.steps[i].schedule[j].main_end !== null &&
                       this.manualAdd.steps[i].schedule[j].lat_end !== null &&
                       this.manualAdd.steps[i].schedule[j].lng_end !== null){    //Is showed in map
                        if(i === 0){    //Is designed one for all
                            this.manualAdd.steps[i].schedule[j].main_end.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.manualAdd.map.marker[i][this.manualAdd.sameConf ? "textU_end" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                            this.manualAdd.steps[i].schedule[j].main_end.setMap(this.manualAdd.map.main);
                        }
                        else           //All irrelevants
                            this.manualAdd.steps[i].schedule[j].main_end.setMap(this.manualAdd.sameConf ? null : this.manualAdd.map.main);
                    }
                }
            }
            
            if(!this.manualAdd.allPosVisible && !this.manualAdd.sameConf)
                this.setVisibilityPosition(true); //AUTO
        },
        setVisibilityPosition: function(auto){
            var i, j;
            if(!auto)
                this.manualAdd.allPosVisible = !this.manualAdd.allPosVisible;
            for(i = 0; i < this.manualAdd.map.marker.length; i++){
                for(j = 0; j < this.manualAdd.steps[i].schedule; j++){
                    if(this.manualAdd.steps[i].schedule[j].main_begin !== null &&
                       this.manualAdd.steps[i].schedule[j].lat_begin !== null &&
                       this.manualAdd.steps[i].schedule[j].lng_begin !== null)
                        this.manualAdd.steps[i].schedule[j].main_begin.setMap(this.manualAdd.allPosVisible ? this.manualAdd.map.main : (i === this.manualAdd.actualStep) ? this.manualAdd.map.main : null);
                    if(this.manualAdd.steps[i].schedule[j].main_end !== null &&
                       this.manualAdd.steps[i].schedule[j].lat_end !== null &&
                       this.manualAdd.steps[i].schedule[j].lng_end !== null)    //Is showed in map
                        this.manualAdd.steps[i].schedule[j].main_end.setMap(this.manualAdd.allPosVisible ? this.manualAdd.map.main : (i === this.manualAdd.actualStep) ? this.manualAdd.map.main : null);
                }
            }
        },
        focusPosition: function(){
            var i, j,
                counter = 0,
                totalLat = 0,
                totalLng = 0,
                bounds = new google.maps.LatLngBounds();
            if(this.manualAdd.sameConf || !this.manualAdd.allPosVisible){
                i = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
                for(j = 0; j < this.manualAdd.steps[i].schedule; j++){
                    if(this.manualAdd.steps[i].schedule[j].main_begin !== null &&
                        this.manualAdd.steps[i].schedule[j].lat_begin !== null &&
                        this.manualAdd.steps[i].schedule[j].lng_begin !== null){
                         counter++;
                         totalLat += this.manualAdd.steps[i].schedule[j].lat_begin;
                         totalLng += this.manualAdd.steps[i].schedule[j].lng_begin;
                         bounds.extend(this.manualAdd.steps[i].schedule[j].main_begin.getPosition());
                         
                        }
                     if(this.manualAdd.steps[i].schedule[j].main_end !== null &&
                        this.manualAdd.steps[i].schedule[j].lat_end !== null &&
                        this.manualAdd.steps[i].schedule[j].lng_end !== null){    //Is showed in map
                         counter++;
                         totalLat += this.manualAdd.steps[i].schedule[j].lat_end;
                         totalLng += this.manualAdd.steps[i].schedule[j].lng_end;
                         bounds.extend(this.manualAdd.steps[i].schedule[j].main_end.getPosition());
                     }
                }
            }
            else
                for(i = 0; i < this.manualAdd.map.marker.length; i++){
                    for(j = 0; j < this.manualAdd.steps[i].schedule; j++){
                        if(this.manualAdd.steps[i].schedule[j].main_begin !== null &&
                           this.manualAdd.steps[i].schedule[j].lat_begin !== null &&
                           this.manualAdd.steps[i].schedule[j].lng_begin !== null){
                            counter++;
                            totalLat += this.manualAdd.steps[i].schedule[j].lat_begin;
                            totalLng += this.manualAdd.steps[i].schedule[j].lng_begin;
                            bounds.extend(this.manualAdd.steps[i].schedule[j].main_begin.getPosition());
                            
                           }
                        if(this.manualAdd.steps[i].schedule[j].main_end !== null &&
                           this.manualAdd.steps[i].schedule[j].lat_end !== null &&
                           this.manualAdd.steps[i].schedule[j].lng_end !== null){    //Is showed in map
                            counter++;
                            totalLat += this.manualAdd.steps[i].schedule[j].lat_end;
                            totalLng += this.manualAdd.steps[i].schedule[j].lng_end;
                            bounds.extend(this.manualAdd.steps[i].schedule[j].main_end.getPosition());
                        }
                    }
                }
            if(counter > 0){
                this.manualAdd.map.main.setCenter({
                    lat: totalLat/counter,
                    lng: totalLng/counter
                });
                if(counter > 1)
                    this.manualAdd.map.main.fitBounds(bounds);
                else
                    this.manualAdd.map.main.setZoom(this.manualAdd.map.data.zoom);
            }
        },
        setActiveInterval: function(i){
            for(var j = 0; j < this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule.length; j++)
                this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].active = j === i;
        },
        positioner: function(pos){
            for(var j = 0; j < this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule.length; j++)
                if(this.manualAdd.steps[this.manualAdd.actualStep].active && this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].active){
                    if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_begin === null){
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_begin = new google.maps.Marker({
                                map: this.manualAdd.map.main,
                                position: pos,
                                icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep][this.manualAdd.sameConf ? "textU_begin" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                            });
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lat_begin = pos.lat();
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lng_begin = pos.lng();
                        this.deleter("begin", this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep, j);
                    }
                    else if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_begin &&
                            this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lat_begin === null &&
                            this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lng_begin === null){
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_begin.setMap(this.manualAdd.map.main);
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_begin.setPosition(pos);
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_begin.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep][this.manualAdd.sameConf ? "textU_begin" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lat_begin = pos.lat();
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lng_begin = pos.lng();
                    }
                    else if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_begin &&
                            this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_end === null){
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_end = new google.maps.Marker({
                                map: this.manualAdd.map.main,
                                position: pos,
                                icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep][this.manualAdd.sameConf ? "textU_end" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                            });
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_end.addListener("dblclick", function(){
                            
                        });
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lat_end = pos.lat();
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lng_end = pos.lng();
                        this.deleter("end", this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep, j);
                    }
                    else if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_end &&
                            this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lat_end === null &&
                            this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lng_end === null){
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_end.setMap(this.manualAdd.map.main);
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_end.setPosition(pos);
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].main_end.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep][this.manualAdd.sameConf ? "textU_end" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lat_end = pos.lat();
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[j].lng_end = pos.lng();
                    }
                }
        },
        deleter: function(type, i, j){
            var me = this;
            if(type === "begin")
                this.manualAdd.steps[i].schedule[j].main_begin.addListener("dblclick", function(){
                    me.manualAdd.steps[i].schedule[j].main_begin.setMap(null);
                    me.manualAdd.steps[i].schedule[j].lat_begin = null;
                    me.manualAdd.steps[i].schedule[j].lng_begin = null;
                });
            else if(type === "end")
                this.manualAdd.steps[i].schedule[j].main_end.addListener("dblclick", function(){
                    me.manualAdd.steps[i].schedule[j].main_end.setMap(null);
                    me.manualAdd.steps[i].schedule[j].lat_end = null;
                    me.manualAdd.steps[i].schedule[j].lng_end = null;
                });
        },
        changeStep: function(e){
            this.manualAdd.actualStep = e;
            this.manualAdd.steps[e].seen = true;
            
            if(!this.manualAdd.allPosVisible)
                this.setVisibilityPosition(true); //AUTO
        },
        setInterval: function(){
            var i,
                newSchedule = [],
                interval = Math.floor(parseInt(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].interval)) <= this.manualAdd.maxInterval ? Math.floor(parseInt(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].interval)) : this.manualAdd.maxInterval,
                length = this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule.length;
            if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule.length < interval){
                for(i = 0; i < interval - length; i++)
                    this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule.push({
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        textBegin: "hh:mm:ss",
                        textEnd: "hh:mm:ss",
                        
                        main_begin: null,
                        main_end: null,
                        lat_begin: null,
                        lng_begin: null,
                        lat_end: null,
                        lng_end: null,
                        active: false
                    });
            }
            else if(length > interval){
                for(i = 0; i < interval; i++)
                    newSchedule.push(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i]);
                this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule = newSchedule;
            }
            if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule.length > 0)
                this.setActiveInterval(0);
        },
        setActivity: function(){
            this.manualAdd.steps[this.manualAdd.actualStep].active = !this.manualAdd.steps[this.manualAdd.actualStep].active;
            if(!this.manualAdd.steps[this.manualAdd.actualStep].active){
                for(var j = 0; j < this.manualAdd.steps[this.manualAdd.actualStep].schedule; j++){
                    if(this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].main_begin !== null &&
                       this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].lat_begin !== null &&
                       this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].lng_begin !== null)
                        this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].main_begin.setMap(null);
                    if(this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].main_end !== null &&
                       this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].lat_end !== null &&
                       this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].lng_end !== null)    //Is showed in map
                        this.manualAdd.steps[this.manualAdd.actualStep].schedule[j].main_end.setMap(null);
                }
            }
            else 
                this.setVisibilityPosition(true); //AUTO
        },
        validation: function(type, i){
            switch(type){
                case "name":
                    this.manualAdd.name.valid = false;
                    if(this.manualAdd.name.value === null ||
                       this.manualAdd.name.value === "")
                        this.manualAdd.name.text = "Nombre no puede estar vacío";
                    else if(this.manualAdd.name.value.length < 8)
                        this.manualAdd.name.text = "Nombre debe contener al menos 8 caracteres";
                    else{
                        this.manualAdd.name.text = "";
                        this.manualAdd.name.valid = true;
                    }
                    break;
                case "email":
                    var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    this.manualAdd.email.valid = false;
                    if(this.manualAdd.email.value === null ||
                       this.manualAdd.email.value === "")
                        this.manualAdd.email.text = "Correo electrónico no puede estar vacío";
                    else if(!emailTest.test(this.manualAdd.email.value))
                        this.manualAdd.email.text = "Correo electrónico no tiene una forma válida";
                    else{
                        this.manualAdd.email.text = "";
                        this.manualAdd.email.valid = true;
                    }
                    break;
                case "pass":
                    this.manualAdd.pass.valid = false;
                    if(this.manualAdd.pass.value === null ||
                       this.manualAdd.pass.value === "")
                        this.manualAdd.pass.text = "Contraseña no puede estar vacío";
                    else if(this.manualAdd.pass.value.length < 8)
                        this.manualAdd.pass.text = "Contraseña debe contener al menos 8 caracteres";
                    else{
                        this.manualAdd.pass.text = "";
                        this.manualAdd.pass.valid = true;
                    }
                    break;
                case "repass":
                    this.manualAdd.repass.valid = false;
                    if(this.manualAdd.repass.value === null ||
                       this.manualAdd.repass.value === "")
                        this.manualAdd.repass.text = "Confirmar contraseña no puede estar vacío";
                    else if(this.manualAdd.repass.value !== this.manualAdd.pass.value)
                        this.manualAdd.repass.text = "Las contraseñas no coinciden";
                    else{
                        this.manualAdd.repass.text = "";
                        this.manualAdd.repass.valid = true;
                    }
                    break;
                case "date":
                    this.manualAdd.date.valid = false;
                    if(this.manualAdd.date.value === null ||
                       this.manualAdd.date.value === "")
                        this.manualAdd.date.text = "Fecha de ingreso no puede estar vacío";
                    else{
                        this.manualAdd.date.text = "";
                        this.manualAdd.date.valid = true;
                    }
                    break;
                case "time-begin":
                    this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].validBegin = false;
                    if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].begin === "")
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].textBegin = "El inicio del intervalo no puede estar vacío";
                    else if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].begin.length !== 8)
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].textBegin = "El inicio del intervalo no tiene un formato apropiado";
                    else{
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].textBegin = "hh:mm:ss";
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].validBegin = true;
                    }
                    break;
                case "time-end":
                    this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].validEnd = false;
                    if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].end === "")
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].textEnd = "El final del intervalo no puede estar vacío";
                    else if(this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].end.length !== 8)
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].textEnd = "El final del intervalo no tiene un formato apropiado";
                    else{
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].textEnd = "hh:mm:ss";
                        this.manualAdd.steps[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].schedule[i].validEnd = true;
                    }
                    break;
            }
        },
        submit: function(e){
            var me = this;
            switch(e){
                case "manual":
                    var i, j, k = 0, limit = 4,
                        first = true,
                        hmdB, hmdE,
                        error = "",
                        valid = true;
                    if(this.manualAdd.name.value === null || this.manualAdd.name.value === ""){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Nombre no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.name.valid = false;
                        this.manualAdd.name.text = "Nombre no puede estar vacío";
                        valid = false;
                    }
                    else if(valid && this.manualAdd.name.value.length < 8){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Nombre debe contener al menos 8 caracteres.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.name.valid = false;
                        this.manualAdd.name.text = "Nombre debe contener al menos 8 caracteres";
                        valid = false;
                    }
                    if(valid && (this.manualAdd.email.value === null || this.manualAdd.email.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Correo electrónico no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.email.valid = false;
                        this.manualAdd.email.text = "Correo electrónico no puede estar vacío";
                        valid = false;
                    }
                    else{
                        var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(valid && !emailTest.test(this.manualAdd.email.value)){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Correo electrónico no tiene una forma válida.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.manualAdd.email.valid = false;
                            this.manualAdd.email.text = "Correo electrónico no tiene una forma válida";
                            valid = false;
                        }
                    }
                    if(valid && (this.manualAdd.pass.value === null || this.manualAdd.pass.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Contraseña no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.pass.valid = false;
                        this.manualAdd.pass.text = "Contraseña no puede estar vacío";
                        valid = false;
                    }
                    else{
                        if(valid && this.manualAdd.pass.value.length < 8){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Contraseña debe contener al menos 8 caracteres.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.manualAdd.pass.valid = false;
                            this.manualAdd.pass.text = "Contraseña debe contener al menos 8 caracteres";
                            valid = false;
                        }
                    }
                    if(valid && (this.manualAdd.repass.value === null || this.manualAdd.repass.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Confirmar contraseña no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.repass.valid = false;
                        this.manualAdd.repass.text = "Confirmar contraseña no puede estar vacío";
                        valid = false;
                    }
                    else{
                        if(valid && (this.manualAdd.repass.value !== this.manualAdd.pass.value)){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Las contraseñas no coinciden.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.manualAdd.repass.valid = false;
                            this.manualAdd.repass.text = "Las contraseñas no coinciden";
                            valid = false;
                        }
                    }
                    if(valid && (this.manualAdd.date.value === null || this.manualAdd.date.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Fecha de ingreso no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.date.valid = false;
                        this.manualAdd.date.text = "Fecha de ingreso no puede estar vacío";
                        valid = false;
                    }
                    else if(valid){
                        for(i = 0; i < (this.manualAdd.sameConf ? 1 : this.manualAdd.map.marker.length); i++){
                            if(this.manualAdd.steps[i].active &&
                               (this.manualAdd.map.marker[i].main_begin === null ||                  //No position
                               this.manualAdd.map.marker[i].lat_begin === null ||
                               this.manualAdd.map.marker[i].lng_begin === null ||
                               this.manualAdd.map.marker[i].main_end === null ||                  //No position
                               this.manualAdd.map.marker[i].lat_end === null ||
                               this.manualAdd.map.marker[i].lng_end === null)){
                                error += (k <= limit) ? "Debes escoger las ubicaciones de inicio y final" + (this.manualAdd.sameConf ? "" : " para el día " + this.manualAdd.steps[i].text) + ".<br>": "";
                                valid = false; k++;
                            }
                        }
                        if(valid){
                            error = "";
                            k = 0;
                            for(i = 0; i < (this.manualAdd.sameConf ? 1 : this.manualAdd.steps.length); i++)
                                if(this.manualAdd.steps[i].active)
                                    for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++){
                                        hmdB = this.manualAdd.steps[i].schedule[j].begin.split(":");
                                        hmdE = this.manualAdd.steps[i].schedule[j].end.split(":");
                                        this.manualAdd.steps[i].schedule[j].validBegin = true;
                                        this.manualAdd.steps[i].schedule[j].validEnd = true;
                                        this.manualAdd.steps[i].schedule[j].textBegin = "hh:mm:ss";
                                        this.manualAdd.steps[i].schedule[j].textEnd = "hh:mm:ss";
                                        if(this.manualAdd.steps[i].schedule[j].begin === ""){
                                            error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " en el día " + this.manualAdd.steps[i].text) + " no puede estar vacío.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validBegin = false;
                                            this.manualAdd.steps[i].schedule[j].textBegin = "El inicio del intervalo no puede estar vacío";
                                            valid = false; k++;
                                        }
                                        if(this.manualAdd.steps[i].schedule[j].end === ""){
                                            error += (k <= limit) ? "El final del intervalo " + (j + 1) + (this.manualAdd.sameConf ? " " : " en el día " + this.manualAdd.steps[i].text) + " no puede estar vacío.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validEnd = false;
                                            this.manualAdd.steps[i].schedule[j].textEnd = "El final del intervalo no puede estar vacío";
                                            valid = false; k++;
                                        }
                                        if(this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                           (this.manualAdd.steps[i].schedule[j].begin > "23:59:59" ||
                                            hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59)){
                                            error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " en el día " + this.manualAdd.steps[i].text) + " no tiene un formato apropiado.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validBegin = false;
                                            this.manualAdd.steps[i].schedule[j].textBegin = "El inicio del intervalo no tiene un formato apropiado";
                                            valid = false; k++;
                                        }
                                        if(this.manualAdd.steps[i].schedule[j].end !== "" &&
                                           (this.manualAdd.steps[i].schedule[j].end > "23:59:59" ||
                                            hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59)){
                                            error += (k <= limit) ? "El final del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " en el día " + this.manualAdd.steps[i].text) + " no tiene un formato apropiado.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validEnd = false;
                                            this.manualAdd.steps[i].schedule[j].textEnd = "El final del intervalo no tiene un formato apropiado";
                                            valid = false; k++;
                                        }
                                        if(this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                           this.manualAdd.steps[i].schedule[j].end !== "" &&
                                           this.manualAdd.steps[i].schedule[j].begin >= this.manualAdd.steps[i].schedule[j].end){
                                            error += (k <= limit) ? "El final del intervalo " + (j + 1) + " debe ser mayor al inicio del mismo" + (this.manualAdd.sameConf ? "" : " en el día " + this.manualAdd.steps[i].text) + ".<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validBegin = false;
                                            this.manualAdd.steps[i].schedule[j].validEnd = false;
                                            this.manualAdd.steps[i].schedule[j].textBegin = "El inicio del intervalo debe ser menor al final del mismo";
                                            this.manualAdd.steps[i].schedule[j].textEnd = "El final del intervalo debe ser mayor al inicio del mismo";
                                            valid = false; k++;
                                        }
                                        if(j > 0 &&
                                           this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                           this.manualAdd.steps[i].schedule[j - 1].end !== "" &&
                                           this.manualAdd.steps[i].schedule[j].begin <= this.manualAdd.steps[i].schedule[j - 1].end){
                                            error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " debe ser mayor al final del intervalo " + j + (this.manualAdd.sameConf ? "" : " en el día " + this.manualAdd.steps[i].text) + ".<br>": "";
                                            this.manualAdd.steps[i].schedule[j].validBegin = false;
                                            this.manualAdd.steps[i].schedule[j - 1].validEnd = false;
                                            this.manualAdd.steps[i].schedule[j].textBegin = "El inicio del intervalo debe ser mayor al final del intervalo anterior";
                                            this.manualAdd.steps[i].schedule[j - 1].textEnd = "El final del intervalo debe ser menor al inicio del intervalo posterior";
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
                            this.models.usuarioEmpleado.post({
                                params: {
                                    nombre: this.manualAdd.name.value,
                                    correo: this.manualAdd.email.value,
                                    pass: this.manualAdd.pass.value,
                                    pass_repeat: this.manualAdd.repass.value,
                                    fecha_ingreso: this.manualAdd.date.value
                                }
                            },function(success){
                                for(i = 0; i < me.manualAdd.steps.length; i++)
                                    if(me.manualAdd.steps[i].active || me.manualAdd.sameConf){
                                        for(j = 0; j < me.manualAdd.steps[me.manualAdd.sameConf ? 0 : i].schedule.length; j++){
                                            me.submitSchedule(i, j, success.body.id, first);
                                            first = false;
                                        }
                                    }
                                    else
                                        me.reset("schedule", i, null);
                                BUTO.components.main.children.recursosRegistrados.grid.updatePagination();
                                BUTO.components.main.alert.description.title = "Registro de Recurso Humano";
                                BUTO.components.main.alert.description.text = "Se ha registrado correctamente el recurso humano '" + success.body.nombre + "'";
                                BUTO.components.main.alert.description.ok = "Aceptar";
                                BUTO.components.main.alert.active = true;
                            },
                            function(error){
                                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                                BUTO.components.main.alert.description.text = "";
                                if(error.body.length > 0)
                                    for(var k = 0; k < error.body.length; k++){
                                        BUTO.components.main.alert.description.text += error.body[k].message + "<br>";
                                        switch(error.body[k].field){
                                            case "nombre":
                                                me.manualAdd.name.valid = false;
                                                me.manualAdd.name.text = error.body[k].message;
                                                break;
                                            case "correo":
                                                me.manualAdd.email.valid = false;
                                                me.manualAdd.email.text = error.body[k].message;
                                                break;
                                        }
                                    }
                                BUTO.components.main.alert.description.ok = "Aceptar";
                                BUTO.components.main.alert.active = true;
                            });
                        }
                        else{
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = (k <= limit) ? error : error + "<br>...";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                        }
                    }
                    break;
                case "import":
                    
                    break;
            }
        },
        submitSchedule: function(i, j, id, first){
            var me = this;
            if(first)
                this.reset("resource");
            this.models.empleadoHorario.post({
                delimiters: id,
                params: {
                    dia: this.manualAdd.steps[i].dayNumber,
                    hora_inicio: this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule[j].begin,
                    hora_fin: this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule[j].end,
                    lat_inicio: this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : i].lat_begin,
                    lat_fin: this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : i].lat_end,
                    lng_inicio: this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : i].lng_begin,
                    lng_fin: this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : i].lng_end
                }
            },
            function(success){
                me.reset("schedule", i, j);
            },
            function(error){
                console.log(error);
            });
        },
        reset: function(a, i, j){
            switch(a){
                case "resource":
                    this.manualAdd.name.value = null;
                    this.manualAdd.email.value = null;
                    this.manualAdd.pass.value = null;
                    this.manualAdd.repass.value = null;
                    this.manualAdd.date.value = null;
                    this.manualAdd.actualStep = 0;
                    break;
                case "schedule":
                    this.manualAdd.steps[i].active = true;
                    this.manualAdd.steps[i].interval = 1;
                    this.manualAdd.steps[i].seen = (this.manualAdd.steps[i].dayNumber === 2) ? true : false;
                    if((j !== null && j === this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule.length - 1) || j === null){
                        if(this.manualAdd.sameConf && this.manualAdd.steps[i].dayNumber === 1){
                            this.reset("all");
                        }
                        else if(!this.manualAdd.sameConf){
                            if(this.manualAdd.map.marker[i].main_begin !== null){
                                this.manualAdd.map.marker[i].main_begin.setMap(null);
                                this.manualAdd.map.marker[i].main_begin = null;
                                this.manualAdd.map.marker[i].lat_begin = null;
                                this.manualAdd.map.marker[i].lng_begin = null;
                            }
                            if(this.manualAdd.map.marker[i].main_end !== null){
                                this.manualAdd.map.marker[i].main_end.setMap(null);
                                this.manualAdd.map.marker[i].main_end = null;
                                this.manualAdd.map.marker[i].lat_end = null;
                                this.manualAdd.map.marker[i].lng_end = null;
                            }
                            this.manualAdd.steps[i].schedule = [];
                            this.manualAdd.steps[i].schedule.push({
                                begin: "",
                                end: "",
                                validBegin: true,
                                validEnd: true,
                                textBegin: "hh:mm:ss",
                                textEnd: "hh:mm:ss",
                        
                                main_begin: null,
                                main_end: null,
                                lat_begin: null,
                                lng_begin: null,
                                lat_end: null,
                                lng_end: null,
                                active: true
                            });
                        }
                    }
                    break;
                case "all":
                    this.manualAdd.name.value = null;
                    this.manualAdd.name.valid = true;
                    this.manualAdd.email.value = null;
                    this.manualAdd.email.valid = true;
                    this.manualAdd.pass.value = null;
                    this.manualAdd.pass.valid = true;
                    this.manualAdd.repass.value = null;
                    this.manualAdd.repass.valid = true;
                    this.manualAdd.date.value = null;
                    this.manualAdd.date.valid = true;
                    this.manualAdd.actualStep = 0;
                    this.manualAdd.sameConf = false;
                    
                    for(i = 0; i < this.manualAdd.steps.length; i++){
                        if(this.manualAdd.map.marker[i].main_begin !== null){
                            this.manualAdd.map.marker[i].main_begin.setMap(null);
                            this.manualAdd.map.marker[i].main_begin = null;
                            this.manualAdd.map.marker[i].lat_begin = null;
                            this.manualAdd.map.marker[i].lng_begin = null;
                        }
                        if(this.manualAdd.map.marker[i].main_end !== null){
                            this.manualAdd.map.marker[i].main_end.setMap(null);
                            this.manualAdd.map.marker[i].main_end = null;
                            this.manualAdd.map.marker[i].lat_end = null;
                            this.manualAdd.map.marker[i].lng_end = null;
                        }
                        this.manualAdd.steps[i].active = true;
                        this.manualAdd.steps[i].interval = 1;
                        this.manualAdd.steps[i].seen = (this.manualAdd.steps[i].dayNumber === 2) ? true : false;
                        this.manualAdd.steps[i].schedule = [];
                        this.manualAdd.steps[i].schedule.push({
                            begin: "",
                            end: "",
                            validBegin: true,
                            validEnd: true,
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
                        
                            main_begin: null,
                            main_end: null,
                            lat_begin: null,
                            lng_begin: null,
                            lat_end: null,
                            lng_end: null,
                            active: true
                        });
                    }
                    break;
            }
        }
    }
});