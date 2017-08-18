module.exports = new Vue({
    data: {
        models: {
            empleado: null,
            empleadoHorario: null
        },
        typeSelection: {
            type: null,
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
                valid: true
            },
            email: {
                value: null,
                valid: true
            },
            pass: {
                value: null,
                valid: true
            },
            repass: {
                value: null,
                valid: true
            },
            date: {
                value: null,
                valid: true
            },
            map: {
                main: null,
                geocoder: null,
                marker: [
                    {
                        main_begin: null,
                        main_end: null,
                        text: "Lu",
                        textU_begin: "I",
                        textU_end: "F",
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
                            id: null
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
                            id: null
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
                            id: null
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
                            id: null
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
                            id: null
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
                            id: null
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
                            id: null
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
                this.models.empleado = e.empleado;
                this.models.empleadoHorario = e.empleadoHorario;
            }
            if(this.typeSelection.type === 1)
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
            if(this.manualAdd.map.marker[0].main_begin){
                this.manualAdd.map.main = new google.maps.Map(document.getElementById('mapAddResource'), {     //Define Map
                    zoom: this.manualAdd.map.data.zoom,
                    center: {
                        lat: this.manualAdd.map.marker[0].lat_begin,
                        lng: this.manualAdd.map.marker[0].lng_begin
                    }
                });
                this.initConfiguration(true);
            }
            else{
                this.manualAdd.map.main = new google.maps.Map(document.getElementById('mapAddResource'), {     //Define Map
                    zoom: this.manualAdd.map.data.zoom
                });
                this.initGeocoder();
            }
            this.manualAdd.map.main.addListener("click", function(e){       //Define on click listener for map
                me.positioner(e.latLng);
            });
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
            var i;
            if(!auto)
                this.manualAdd.sameConf = !this.manualAdd.sameConf;
            this.manualAdd.steps[0].active = true;
            for(i = 0; i < this.manualAdd.map.marker.length; i++){
                if(this.manualAdd.map.marker[i].main_begin !== null &&
                   this.manualAdd.map.marker[i].lat_begin !== null &&
                   this.manualAdd.map.marker[i].lng_begin !== null){    //Is showed in map
                    if(i === 0){    //Is designed one for all
                        this.manualAdd.map.marker[i].main_begin.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.manualAdd.map.marker[i][this.manualAdd.sameConf ? "textU_begin" : "text"] + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                        this.manualAdd.map.marker[i].main_begin.setMap(this.manualAdd.map.main);
                    }
                    else           //All irrelevants
                        this.manualAdd.map.marker[i].main_begin.setMap(this.manualAdd.sameConf ? null : this.manualAdd.map.main);
                }
                if(this.manualAdd.map.marker[i].main_end !== null &&
                   this.manualAdd.map.marker[i].lat_end !== null &&
                   this.manualAdd.map.marker[i].lng_end !== null){    //Is showed in map
                    if(i === 0){    //Is designed one for all
                        this.manualAdd.map.marker[i].main_end.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.manualAdd.map.marker[i][this.manualAdd.sameConf ? "textU_end" : "text"] + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                        this.manualAdd.map.marker[i].main_end.setMap(this.manualAdd.map.main);
                    }
                    else           //All irrelevants
                        this.manualAdd.map.marker[i].main_end.setMap(this.manualAdd.sameConf ? null : this.manualAdd.map.main);
                }
            }
            
            if(!this.manualAdd.allPosVisible && !this.manualAdd.sameConf)
                this.setVisibilityPosition(true); //AUTO
        },
        setVisibilityPosition: function(auto){
            var i;
            if(!auto)
                this.manualAdd.allPosVisible = !this.manualAdd.allPosVisible;
            for(i = 0; i < this.manualAdd.map.marker.length; i++){
                if(this.manualAdd.map.marker[i].main_begin !== null &&
                   this.manualAdd.map.marker[i].lat_begin !== null &&
                   this.manualAdd.map.marker[i].lng_begin !== null)
                    this.manualAdd.map.marker[i].main_begin.setMap(this.manualAdd.allPosVisible ? this.manualAdd.map.main : (i === this.manualAdd.actualStep) ? this.manualAdd.map.main : null);
                if(this.manualAdd.map.marker[i].main_end !== null &&
                   this.manualAdd.map.marker[i].lat_end !== null &&
                   this.manualAdd.map.marker[i].lng_end !== null)    //Is showed in map
                    this.manualAdd.map.marker[i].main_end.setMap(this.manualAdd.allPosVisible ? this.manualAdd.map.main : (i === this.manualAdd.actualStep) ? this.manualAdd.map.main : null);
            }
        },
        focusPosition: function(){
            var i,
                counter = 0,
                totalLat = 0,
                totalLng = 0,
                bounds = new google.maps.LatLngBounds();
            if(this.manualAdd.sameConf || !this.manualAdd.allPosVisible){
                i = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
                if(this.manualAdd.map.marker[i].main_begin !== null &&
                    this.manualAdd.map.marker[i].lat_begin !== null &&
                    this.manualAdd.map.marker[i].lng_begin !== null){
                     counter++;
                     totalLat += this.manualAdd.map.marker[i].lat_begin;
                     totalLng += this.manualAdd.map.marker[i].lng_begin;
                     bounds.extend(this.manualAdd.map.marker[i].main_begin.getPosition());
                     
                    }
                 if(this.manualAdd.map.marker[i].main_end !== null &&
                    this.manualAdd.map.marker[i].lat_end !== null &&
                    this.manualAdd.map.marker[i].lng_end !== null){    //Is showed in map
                     counter++;
                     totalLat += this.manualAdd.map.marker[i].lat_end;
                     totalLng += this.manualAdd.map.marker[i].lng_end;
                     bounds.extend(this.manualAdd.map.marker[i].main_end.getPosition());
                 }
            }
            else
                for(i = 0; i < this.manualAdd.map.marker.length; i++){
                    if(this.manualAdd.map.marker[i].main_begin !== null &&
                       this.manualAdd.map.marker[i].lat_begin !== null &&
                       this.manualAdd.map.marker[i].lng_begin !== null){
                        counter++;
                        totalLat += this.manualAdd.map.marker[i].lat_begin;
                        totalLng += this.manualAdd.map.marker[i].lng_begin;
                        bounds.extend(this.manualAdd.map.marker[i].main_begin.getPosition());
                        
                       }
                    if(this.manualAdd.map.marker[i].main_end !== null &&
                       this.manualAdd.map.marker[i].lat_end !== null &&
                       this.manualAdd.map.marker[i].lng_end !== null){    //Is showed in map
                        counter++;
                        totalLat += this.manualAdd.map.marker[i].lat_end;
                        totalLng += this.manualAdd.map.marker[i].lng_end;
                        bounds.extend(this.manualAdd.map.marker[i].main_end.getPosition());
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
        positioner: function(pos){
            if(this.manualAdd.steps[this.manualAdd.actualStep].active){
                if(this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_begin === null){
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_begin = new google.maps.Marker({
                            map: this.manualAdd.map.main,
                            position: pos,
                            icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep][this.manualAdd.sameConf ? "textU_begin" : "text"] + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                        });
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lat_begin = pos.lat();
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lng_begin = pos.lng();
                    this.deleter("begin", this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep);
                }
                else if(this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_begin &&
                        this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lat_begin === null &&
                        this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lng_begin === null){
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_begin.setMap(this.manualAdd.map.main);
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_begin.setPosition(pos);
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_begin.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep][this.manualAdd.sameConf ? "textU_begin" : "text"] + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lat_begin = pos.lat();
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lng_begin = pos.lng();
                }
                else if(this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_begin &&
                        this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_end === null){
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_end = new google.maps.Marker({
                            map: this.manualAdd.map.main,
                            position: pos,
                            icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep][this.manualAdd.sameConf ? "textU_end" : "text"] + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                        });
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_end.addListener("dblclick", function(){
                        
                    });
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lat_end = pos.lat();
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lng_end = pos.lng();
                    this.deleter("end", this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep);
                }
                else if(this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_end &&
                        this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lat_end === null &&
                        this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lng_end === null){
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_end.setMap(this.manualAdd.map.main);
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_end.setPosition(pos);
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].main_end.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep][this.manualAdd.sameConf ? "textU_end" : "text"] + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lat_end = pos.lat();
                    this.manualAdd.map.marker[this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep].lng_end = pos.lng();
                }
            }
        },
        deleter: function(type, i){
            var me = this;
            if(type === "begin")
                this.manualAdd.map.marker[i].main_begin.addListener("dblclick", function(){
                    me.manualAdd.map.marker[i].main_begin.setMap(null);
                    me.manualAdd.map.marker[i].lat_begin = null;
                    me.manualAdd.map.marker[i].lng_begin = null;
                });
            else if(type === "end")
                this.manualAdd.map.marker[i].main_end.addListener("dblclick", function(){
                    me.manualAdd.map.marker[i].main_end.setMap(null);
                    me.manualAdd.map.marker[i].lat_end = null;
                    me.manualAdd.map.marker[i].lng_end = null;
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
                interval = Math.floor(parseInt(this.manualAdd.steps[this.manualAdd.actualStep].interval)) <= this.manualAdd.maxInterval ? Math.floor(parseInt(this.manualAdd.steps[this.manualAdd.actualStep].interval)) : this.manualAdd.maxInterval,
                length = this.manualAdd.steps[this.manualAdd.actualStep].schedule.length;
            if(this.manualAdd.steps[this.manualAdd.actualStep].schedule.length < interval){
                for(i = 0; i < interval - length; i++)
                    this.manualAdd.steps[this.manualAdd.actualStep].schedule.push({
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        id: null
                    });
            }
            else if(length > interval){
                for(i = 0; i < interval; i++)
                    newSchedule.push(this.manualAdd.steps[this.manualAdd.actualStep].schedule[i]);
                this.manualAdd.steps[this.manualAdd.actualStep].schedule = newSchedule;
            }
        },
        setActivity: function(){
            this.manualAdd.steps[this.manualAdd.actualStep].active = !this.manualAdd.steps[this.manualAdd.actualStep].active;
            if(!this.manualAdd.steps[this.manualAdd.actualStep].active){
                if(this.manualAdd.map.marker[this.manualAdd.actualStep].main_begin !== null &&
                   this.manualAdd.map.marker[this.manualAdd.actualStep].lat_begin !== null &&
                   this.manualAdd.map.marker[this.manualAdd.actualStep].lng_begin !== null)
                    this.manualAdd.map.marker[this.manualAdd.actualStep].main_begin.setMap(null);
                if(this.manualAdd.map.marker[this.manualAdd.actualStep].main_end !== null &&
                   this.manualAdd.map.marker[this.manualAdd.actualStep].lat_end !== null &&
                   this.manualAdd.map.marker[this.manualAdd.actualStep].lng_end !== null)    //Is showed in map
                    this.manualAdd.map.marker[this.manualAdd.actualStep].main_end.setMap(null);
            }
            else 
                this.setVisibilityPosition(true); //AUTO
        },
        validation: function(type, i){
            switch(type){
                case "name":
                    if(this.manualAdd.name.value === null ||
                       this.manualAdd.name.value === "" ||
                       this.manualAdd.name.value.length < 8)
                        this.manualAdd.name.valid = false;
                    else
                        this.manualAdd.name.valid = true;
                    break;
                case "email":
                    var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(this.manualAdd.email.value === null ||
                       this.manualAdd.email.value === "" ||
                       !emailTest.test(this.manualAdd.email.value))
                        this.manualAdd.email.valid = false;
                    else
                        this.manualAdd.email.valid = true;
                    break;
                case "pass":
                    if(this.manualAdd.pass.value === null ||
                       this.manualAdd.pass.value === "" ||
                       this.manualAdd.pass.value.length < 8)
                        this.manualAdd.pass.valid = false;
                    else
                        this.manualAdd.pass.valid = true;
                    break;
                case "repass":
                    if(this.manualAdd.repass.value === null ||
                       this.manualAdd.repass.value === "" ||
                       this.manualAdd.repass.value !== this.manualAdd.pass.value)
                        this.manualAdd.repass.valid = false;
                    else
                        this.manualAdd.repass.valid = true;
                    break;
                case "date":
                    if(this.manualAdd.date.value === null ||
                       this.manualAdd.date.value === "")
                        this.manualAdd.date.valid = false;
                    else
                        this.manualAdd.date.valid = true;
                    break;
                case "time-begin":
                    this.manualAdd.steps[this.manualAdd.actualStep].schedule[i].validBegin = this.manualAdd.steps[this.manualAdd.actualStep].schedule[i].begin !== "" && this.manualAdd.steps[this.manualAdd.actualStep].schedule[i].begin.length === 8;
                    break;
                case "time-end":
                    this.manualAdd.steps[this.manualAdd.actualStep].schedule[i].validEnd = this.manualAdd.steps[this.manualAdd.actualStep].schedule[i].end !== "" && this.manualAdd.steps[this.manualAdd.actualStep].schedule[i].end.length === 8;
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
                        valid = false;
                    }
                    else if(valid && this.manualAdd.name.value.length < 8){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Nombre debe contener al menos 8 caracteres.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.name.valid = false;
                        valid = false;
                    }
                    if(valid && (this.manualAdd.email.value === null || this.manualAdd.email.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Correo electrónico no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.email.valid = false;
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
                            valid = false;
                        }
                    }
                    if(valid && (this.manualAdd.pass.value === null || this.manualAdd.pass.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Contraseña no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.pass.valid = false;
                        valid = false;
                    }
                    else{
                        if(valid && this.manualAdd.pass.value.length < 8){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Contraseña debe contener al menos 8 caracteres.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.manualAdd.pass.valid = false;
                            valid = false;
                        }
                    }
                    if(valid && (this.manualAdd.repass.value === null || this.manualAdd.repass.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Confirmar contraseña no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.repass.valid = false;
                        valid = false;
                    }
                    else{
                        if(valid && (this.manualAdd.repass.value !== this.manualAdd.pass.value)){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Las contraseñas no coinciden.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.manualAdd.repass.valid = false;
                            valid = false;
                        }
                    }
                    if(valid && (this.manualAdd.date.value === null || this.manualAdd.date.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Fecha de ingreso no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.date.valid = false;
                        valid = false;
                    }
                    else {
                        if(valid){
                            if(this.manualAdd.sameConf){
                                i = 0;
                                if(this.manualAdd.map.marker[i].main_begin === null ||                  //No position
                                   this.manualAdd.map.marker[i].lat_begin === null ||
                                   this.manualAdd.map.marker[i].lng_begin === null ||
                                   this.manualAdd.map.marker[i].main_end === null ||                  //No position
                                   this.manualAdd.map.marker[i].lat_end === null ||
                                   this.manualAdd.map.marker[i].lng_end === null){
                                    BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                                    BUTO.components.main.alert.description.text = "Debes escoger las ubicaciones de inicio y final.";
                                    BUTO.components.main.alert.description.ok = "Aceptar";
                                    BUTO.components.main.alert.active = true;
                                    valid = false;
                                }
                                
                                //
                                if(valid){
                                    for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++){
                                        hmdB = this.manualAdd.steps[i].schedule[j].begin.split(":");
                                        hmdE = this.manualAdd.steps[i].schedule[j].end.split(":");
                                        this.manualAdd.steps[i].schedule[j].validBegin = true;
                                        this.manualAdd.steps[i].schedule[j].validEnd = true;
                                        if(this.manualAdd.steps[i].schedule[j].begin === ""){
                                            error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " no puede estar vacío.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validBegin = false;
                                            valid = false; k++;
                                        }
                                        if(this.manualAdd.steps[i].schedule[j].end === ""){
                                            error += (k <= limit) ? "El final del intervalo " + (j + 1) + " no puede estar vacío.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validEnd = false;
                                            valid = false; k++;
                                        }
                                        if(this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                           (this.manualAdd.steps[i].schedule[j].begin > "23:59:59" ||
                                            hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59)){
                                            error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " no tiene un formato apropiado.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validBegin = false;
                                            valid = false; k++;
                                        }
                                        if(this.manualAdd.steps[i].schedule[j].end !== "" &&
                                           (this.manualAdd.steps[i].schedule[j].end > "23:59:59" ||
                                            hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59)){
                                            error += (k <= limit) ? "El final del intervalo " + (j + 1) + " no tiene un formato apropiado.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validEnd = false;
                                            valid = false; k++;
                                        }
                                        if(this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                           this.manualAdd.steps[i].schedule[j].end !== "" &&
                                           this.manualAdd.steps[i].schedule[j].begin >= this.manualAdd.steps[i].schedule[j].end){
                                            error += (k <= limit) ? "El final del intervalo " + (j + 1) + " debe ser mayor al inicio del mismo.<br>" : "";
                                            this.manualAdd.steps[i].schedule[j].validBegin = false;
                                            this.manualAdd.steps[i].schedule[j].validEnd = false;
                                            valid = false; k++;
                                        }
                                        if(j > 0 &&
                                           this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                           this.manualAdd.steps[i].schedule[j - 1].end !== "" &&
                                           this.manualAdd.steps[i].schedule[j].begin <= this.manualAdd.steps[i].schedule[j - 1].end){
                                            error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " debe ser mayor al final del intervalo " + j + ".<br>": "";
                                            this.manualAdd.steps[i].schedule[j].validBegin = false;
                                            this.manualAdd.steps[i].schedule[j - 1].validEnd = false;
                                            valid = false; k++;
                                        }
                                    }
                                    if(valid){
                                        console.log("ALL well SAME");
                                        //this.models.sucursal.post({
                                        //    params: {
                                        //        nombre: this.manualAdd.name.value,
                                        //        lat: this.manualAdd.map.marker.position.lat,
                                        //        lng: this.manualAdd.map.marker.position.lng
                                        //    }
                                        //},
                                        //function(success){
                                        //    for(i = 0; i < me.manualAdd.steps.length; i++)
                                        //        for(j = 0; j < me.manualAdd.steps[0].schedule.length; j++){
                                        //            me.submitSchedule(i, j, success.body.id, first);
                                        //            first = false;
                                        //        }
                                        //    BUTO.components.main.children.tiendasRegistradas.grid.updatePagination();
                                        //    BUTO.components.main.alert.description.title = "Registro de Tienda";
                                        //    BUTO.components.main.alert.description.text = "Se ha registrado correctamente la tienda '" + success.body.nombre + "'";
                                        //    BUTO.components.main.alert.description.ok = "Aceptar";
                                        //    BUTO.components.main.alert.active = true;
                                        //},
                                        //function(error){
                                        //    BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                                        //    BUTO.components.main.alert.description.text = error.body[0].message;
                                        //    BUTO.components.main.alert.description.ok = "Aceptar";
                                        //    BUTO.components.main.alert.active = true;
                                        //});
                                    }
                                    else{
                                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                                        BUTO.components.main.alert.description.text = (k <= limit) ? error : error + "<br>...";
                                        BUTO.components.main.alert.description.ok = "Aceptar";
                                        BUTO.components.main.alert.active = true;
                                    }
                                }
                            }
                            else{
                                for(i = 0; i < this.manualAdd.map.marker.length; i++){
                                    if(this.manualAdd.steps[i].active &&
                                       (this.manualAdd.map.marker[i].main_begin === null ||                  //No position
                                       this.manualAdd.map.marker[i].lat_begin === null ||
                                       this.manualAdd.map.marker[i].lng_begin === null ||
                                       this.manualAdd.map.marker[i].main_end === null ||                  //No position
                                       this.manualAdd.map.marker[i].lat_end === null ||
                                       this.manualAdd.map.marker[i].lng_end === null)){
                                        error += (k <= limit) ? "Debes escoger las ubicaciones de inicio y final para el día " + this.manualAdd.steps[i].text + ".<br>": "";
                                        valid = false; k++;
                                    }
                                }
                                
                                //
                                if(valid){
                                    error = "";
                                    k = 0;
                                    for(i = 0; i < this.manualAdd.steps.length; i++)
                                        if(this.manualAdd.steps[i].active)
                                            for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++){
                                                hmdB = this.manualAdd.steps[i].schedule[j].begin.split(":");
                                                hmdE = this.manualAdd.steps[i].schedule[j].end.split(":");
                                                this.manualAdd.steps[i].schedule[j].validBegin = true;
                                                this.manualAdd.steps[i].schedule[j].validEnd = true;
                                                if(this.manualAdd.steps[i].schedule[j].begin === ""){
                                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " no puede estar vacío.<br>" : "";
                                                    this.manualAdd.steps[i].schedule[j].validBegin = false;
                                                    valid = false; k++;
                                                }
                                                if(this.manualAdd.steps[i].schedule[j].end === ""){
                                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " no puede estar vacío.<br>" : "";
                                                    this.manualAdd.steps[i].schedule[j].validEnd = false;
                                                    valid = false; k++;
                                                }
                                                if(this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                                   (this.manualAdd.steps[i].schedule[j].begin > "23:59:59" ||
                                                    hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59)){
                                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " no tiene un formato apropiado.<br>" : "";
                                                    this.manualAdd.steps[i].schedule[j].validBegin = false;
                                                    valid = false; k++;
                                                }
                                                if(this.manualAdd.steps[i].schedule[j].end !== "" &&
                                                   (this.manualAdd.steps[i].schedule[j].end > "23:59:59" ||
                                                    hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59)){
                                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " no tiene un formato apropiado.<br>" : "";
                                                    this.manualAdd.steps[i].schedule[j].validEnd = false;
                                                    valid = false; k++;
                                                }
                                                if(this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                                   this.manualAdd.steps[i].schedule[j].end !== "" &&
                                                   this.manualAdd.steps[i].schedule[j].begin >= this.manualAdd.steps[i].schedule[j].end){
                                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + " debe ser mayor al inicio del mismo en el día " + this.manualAdd.steps[i].text + ".<br>" : "";
                                                    this.manualAdd.steps[i].schedule[j].validBegin = false;
                                                    this.manualAdd.steps[i].schedule[j].validEnd = false;
                                                    valid = false; k++;
                                                }
                                                if(j > 0 &&
                                                   this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                                   this.manualAdd.steps[i].schedule[j - 1].end !== "" &&
                                                   this.manualAdd.steps[i].schedule[j].begin <= this.manualAdd.steps[i].schedule[j - 1].end){
                                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " debe ser mayor al final del intervalo " + j + " en el día " + this.manualAdd.steps[i].text + ".<br>": "";
                                                    this.manualAdd.steps[i].schedule[j].validBegin = false;
                                                    this.manualAdd.steps[i].schedule[j - 1].validEnd = false;
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
                                    console.log("ALL well IND");
                                    //this.models.sucursal.post({
                                    //    params: {
                                    //        nombre: this.manualAdd.name.value,
                                    //        lat: this.manualAdd.map.marker.position.lat,
                                    //        lng: this.manualAdd.map.marker.position.lng
                                    //    }
                                    //},
                                    //function(success){
                                    //    for(i = 0; i < me.manualAdd.steps.length; i++)
                                    //        if(me.manualAdd.steps[i].active){
                                    //            for(j = 0; j < me.manualAdd.steps[i].schedule.length; j++){
                                    //                me.submitSchedule(i, j, success.body.id, first);
                                    //                first = false;
                                    //            }
                                    //        }
                                    //        else
                                    //            me.reset("schedule", i);
                                    //    BUTO.components.main.children.tiendasRegistradas.grid.updatePagination();
                                    //    BUTO.components.main.alert.description.title = "Registro de Tienda";
                                    //    BUTO.components.main.alert.description.text = "Se ha registrado correctamente la tienda '" + success.body.nombre + "'";
                                    //    BUTO.components.main.alert.description.ok = "Aceptar";
                                    //    BUTO.components.main.alert.active = true;
                                    //},
                                    //function(error){
                                    //    BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                                    //    BUTO.components.main.alert.description.text = error.body[0].message;
                                    //    BUTO.components.main.alert.description.ok = "Aceptar";
                                    //    BUTO.components.main.alert.active = true;
                                    //});
                                }
                                else{
                                    BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                                    BUTO.components.main.alert.description.text = (k <= limit) ? error : error + "<br>...";
                                    BUTO.components.main.alert.description.ok = "Aceptar";
                                    BUTO.components.main.alert.active = true;
                                }
                            }
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
                this.reset("store");
            if(this.manualAdd.sameConf){
                this.models.sucursalHorario.post({
                    delimiters: id,
                    params: {
                        dia: this.manualAdd.steps[i].dayNumber,
                        hora_inicio: this.manualAdd.steps[0].schedule[j].begin,
                        hora_fin: this.manualAdd.steps[0].schedule[j].end
                    }
                },
                function(success){
                    me.reset("schedule", i, j);
                },
                function(error){
                    console.log(error);
                });
            }
            else{
                this.models.sucursalHorario.post({
                    delimiters: id,
                    params: {
                        dia: this.manualAdd.steps[i].dayNumber,
                        hora_inicio: this.manualAdd.steps[i].schedule[j].begin,
                        hora_fin: this.manualAdd.steps[i].schedule[j].end
                    }
                },
                function(success){
                    me.reset("schedule", i, j);
                },
                function(error){
                    console.log(error);
                });
            }
        },
        reset: function(a, i, j){
            switch(a){
                case "store":
                    this.manualAdd.name.value = null;
                    this.manualAdd.map.marker.main.setMap(null);
                    this.manualAdd.map.marker.main = null;
                    this.manualAdd.actualStep = 0;
                    break;
                case "schedule":
                    this.manualAdd.steps[i].active = true;
                    this.manualAdd.steps[i].interval = 1;
                    this.manualAdd.steps[i].seen = (this.manualAdd.steps[i].dayNumber === 2) ? true : false;
                    if((j && j === this.manualAdd.steps[i].schedule.length - 1) || !j){
                        this.manualAdd.steps[i].schedule = [];
                        this.manualAdd.steps[i].schedule.push({
                            begin: "",
                            end: "",
                            validBegin: true,
                            validEnd: true,
                            id: null
                        });
                    }
                    break;
                case "all":
                    this.manualAdd.name.value = null;
                    if(this.manualAdd.map.marker.main){
                        this.manualAdd.map.marker.main.setMap(null);
                        this.manualAdd.map.marker.main = null;
                    }
                    this.manualAdd.actualStep = 0;
                    this.manualAdd.sameConf = false;
                    
                    for(i = 0; i < this.manualAdd.steps.length; i++){
                        this.manualAdd.steps[i].active = true;
                        this.manualAdd.steps[i].interval = 1;
                        this.manualAdd.steps[i].seen = (this.manualAdd.steps[i].dayNumber === 2) ? true : false;
                        this.manualAdd.steps[i].schedule = [];
                        this.manualAdd.steps[i].schedule.push({
                            begin: "",
                            end: "",
                            validBegin: true,
                            validEnd: true,
                            id: null
                        });
                    }
                    break;
            }
        }
    }
});