module.exports = new Vue({
    data: {
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
        importer: {
            first: true,
            editIndex: null,
            plugins: {
                xlsx: require("xlsx")
            },
            file: {
                value: null,
                text: "No has seleccionado ningún archivo"
            },
            map: {
                main: null,
                geocoder: null,
                data: {
                    address: "Ciudad de México, México",
                    zoom: 13
                }
            },
            resource: [],
            total: 0,
            valid: true,
            variant: {
                nameId: null,
                emailId: null,
                passwordId: null,
                rePasswordId: null,
                phoneId: null,
                dayId: null,
                beginAddressId: null,
                endAddressId: null,
                scheduleId: null,
                name: [
                    { id: "Nombre" },
                    { id: "nombre" },
                    { id: "NOMBRE" }
                ],
                email: [
                    { id: "Correo" },
                    { id: "correo" },
                    { id: "CORREO" }
                ],
                password: [
                    { id: "Contraseña" },
                    { id: "contraseña" },
                    { id: "CONTRASEÑA" }
                ],
                rePassword: [
                    { id: "Confirmar Contraseña" },
                    { id: "confirmar contraseña" },
                    { id: "CONFIRMAR CONTRASEÑA" },
                    { id: "Confirmar contraseña" }
                ],
                phone: [
                    { id: "Teléfono" },
                    { id: "teléfono" },
                    { id: "TELÉFONO" },
                    { id: "Telefono" },
                    { id: "telefono" },
                    { id: "TELEFONO" }
                ],
                day: [
                    { id: "Día" },
                    { id: "día" },
                    { id: "DÍA" },
                    { id: "Dia" },
                    { id: "dia" },
                    { id: "DIA" }
                ],
                beginAddress: [
                    { id: "Dirección Inicio" },
                    { id: "dirección inicio" },
                    { id: "Dirección inicio" },
                    { id: "DIRECCIÓN INICIO" },
                    { id: "Direccion Inicio" },
                    { id: "direccion inicio" },
                    { id: "Direccion inicio" },
                    { id: "DIRECCION INICIO" }
                ],
                endAddress: [
                    { id: "Dirección Fin" },
                    { id: "dirección fin" },
                    { id: "Dirección fin" },
                    { id: "DIRECCIÓN FIN" },
                    { id: "Direccion Fin" },
                    { id: "direccion fin" },
                    { id: "Direccion fin" },
                    { id: "DIRECCION FIN" }
                ],
                schedule: [
                    { id: "Horario" },
                    { id: "horario" },
                    { id: "HORARIO" }
                ],
                monday: [
                    "Lunes",
                    "lunes",
                    "LUNES"
                ],
                tuesday: [
                    "Martes",
                    "martes",
                    "MARTES"
                ],
                wednesday: [
                    "Miércoles",
                    "miércoles",
                    "MIÉRCOLES",
                    "Miércoles",
                    "miércoles",
                    "MIÉRCOLES"
                ],
                thursday: [
                    "Jueves",
                    "jueves",
                    "JUEVES"
                ],
                friday: [
                    "Viernes",
                    "viernes",
                    "VIERNES"
                ],
                saturday: [
                    "Sábado",
                    "sábado",
                    "SÁBADO",
                    "Sabado",
                    "sabado",
                    "SABADO"
                ],
                sunday: [
                    "Domingo",
                    "domingo",
                    "DOMINGO"
                ]
            }
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
            else
                this.importer.first = true;
        },
        mainSelect: function(e){
            var me = this;
            this.typeSelection.type = e;
            Vue.nextTick(function(){
                if(e === 0)
                    $('.input-info').popover();
                else if(e === 1)
                    me.initMap();
            });
        },
        initMap: function(){
            var i, j, exists = 0,
                me = this;
            if(this.typeSelection.type === 1){
                this.manualAdd.map.main = new google.maps.Map(document.getElementById('mapAddResource'), {     //Define Map
                    zoom: this.manualAdd.map.data.zoom
                });
                this.manualAdd.map.main.addListener("click", function(e){       //Define on click listener for map
                    me.positioner(e.latLng);
                });
                for(i = 0; i < this.manualAdd.steps.length; i++)
                    if(this.manualAdd.steps[i].active)
                        for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++)
                            if((this.manualAdd.steps[i].schedule[j].main_begin !== null &&
                                this.manualAdd.steps[i].schedule[j].lat_begin !== null &&
                                this.manualAdd.steps[i].schedule[j].lng_begin !== null) ||
                                (this.manualAdd.steps[i].schedule[j].main_end !== null &&
                                this.manualAdd.steps[i].schedule[j].lat_end !== null &&
                                this.manualAdd.steps[i].schedule[j].lng_end !== null))
                                exists++;
                this.initConfiguration(true);
                this.initSearch();
                this.initFocus();
                this.initGeocoder(exists);
                if(exists !== 0)
                    this.focusPosition();
            }
            else{
                this.importer.map.main = new google.maps.Map(document.getElementById('mapAddImportResource'), {     //Define Map
                    zoom: this.importer.map.data.zoom
                });
                this.importer.map.main.addListener("click", function(e){       //Define on click listener for map
                    me.positioner(e.latLng);
                });
                //this.initSearch();
                this.initFocus();
            }
        },
        initFocus: function(){
            if(this.typeSelection.type === 1)
                this.manualAdd.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionAddResource'));
            else
                this.importer.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionAddImportResource'));
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
        initGeocoder: function(exists){
            var me = this;
            if(this.typeSelection.type === 1){
                this.manualAdd.map.geocoder = new google.maps.Geocoder();      //Geocoder for fisrt position
                if(exists === 0)
                    this.manualAdd.map.geocoder.geocode({                          //Geocoder for placing
                        address: this.manualAdd.map.data.address
                    },
                    function(response, status){
                        if(status === "OK")
                            me.manualAdd.map.main.setCenter(response[0].geometry.location);
                        else
                            console.log(status);
                    });
            }
            else
                this.importer.map.geocoder = new google.maps.Geocoder();      //Geocoder for fisrt position
        },
        initConfiguration: function(auto){
            var i = 0, j;
            if(!auto){
                this.manualAdd.sameConf = !this.manualAdd.sameConf;
                this.manualAdd.steps[0].active = true;
                
                if(this.manualAdd.allPosVisible === 0)
                    this.manualAdd.allPosVisible = 1;
            }
            for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++){
                if(this.manualAdd.steps[i].schedule[j].main_begin !== null &&
                   this.manualAdd.steps[i].schedule[j].lat_begin !== null &&
                   this.manualAdd.steps[i].schedule[j].lng_begin !== null){    //Is showed in map
                    this.manualAdd.steps[i].schedule[j].main_begin.setLabel(this.manualAdd.map.marker[i][this.manualAdd.sameConf ? "textU_begin" : "text"] + (j + 1));
                    this.manualAdd.steps[i].schedule[j].main_begin.setTitle("Inicio del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " para el día " + this.manualAdd.steps[i].text));
                    this.manualAdd.steps[i].schedule[j].main_begin.setMap(this.manualAdd.map.main);
                }
                if(this.manualAdd.steps[i].schedule[j].main_end !== null &&
                   this.manualAdd.steps[i].schedule[j].lat_end !== null &&
                   this.manualAdd.steps[i].schedule[j].lng_end !== null){    //Is showed in map
                    this.manualAdd.steps[i].schedule[j].main_end.setLabel(this.manualAdd.map.marker[i][this.manualAdd.sameConf ? "textU_end" : "text"] + (j + 1));
                    this.manualAdd.steps[i].schedule[j].main_end.setTitle("Final del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " para el día " + this.manualAdd.steps[i].text));
                    this.manualAdd.steps[i].schedule[j].main_end.setMap(this.manualAdd.map.main);
                }
            }
            
            this.setVisibilityPosition(true); //AUTO
        },
        setVisibilityPosition: function(auto){
            var i, j, k, step = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
            if(!auto)
                this.manualAdd.allPosVisible = this.manualAdd.allPosVisible < 2 ? this.manualAdd.allPosVisible + 1 : 0;
            for(i = 0; i < this.manualAdd.steps.length; i++){
                if(this.manualAdd.steps[i].active){
                    k = step;
                    for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++){
                        if(this.manualAdd.steps[i].schedule[j].main_begin !== null &&
                           this.manualAdd.steps[i].schedule[j].lat_begin !== null &&
                           this.manualAdd.steps[i].schedule[j].lng_begin !== null)
                            this.manualAdd.steps[i].schedule[j].main_begin.setMap(this.manualAdd.allPosVisible === 0 ? this.manualAdd.map.main :
                                                                                  this.manualAdd.allPosVisible === 1 ? (i === k ? this.manualAdd.map.main : null) :
                                                                                  ((i === k && this.manualAdd.steps[i].schedule[j].active) ? this.manualAdd.map.main : null));
                        if(this.manualAdd.steps[i].schedule[j].main_end !== null &&
                           this.manualAdd.steps[i].schedule[j].lat_end !== null &&
                           this.manualAdd.steps[i].schedule[j].lng_end !== null)    //Is showed in map
                            this.manualAdd.steps[i].schedule[j].main_end.setMap(this.manualAdd.allPosVisible === 0 ? this.manualAdd.map.main :
                                                                                  this.manualAdd.allPosVisible === 1 ? (i === k ? this.manualAdd.map.main : null) :
                                                                                  ((i === k && this.manualAdd.steps[i].schedule[j].active) ? this.manualAdd.map.main : null));
                    }
                }
            }
        },
        getDirection: function(type, pos, step, j){
            var me = this;
            switch(type){
                case "begin":
                    this.manualAdd.steps[step].schedule[j].main_begin.addListener("rightclick", function(){
                        me.manualAdd.steps[step].schedule[j].window_begin.open(me.manualAdd.map.main, me.manualAdd.steps[step].schedule[j].main_begin);
                    });
                    this.manualAdd.steps[step].schedule[j].window_begin = new google.maps.InfoWindow({
                        content: "Dirección no encontrada.",
                        maxWidth: 175
                    });
                    this.manualAdd.map.geocoder.geocode({                          //Geocoder for placing
                        location: pos
                    },
                    function(response, status){
                        if(status === "OK" && response[0])
                            me.manualAdd.steps[step].schedule[j].window_begin.setContent(response[0].formatted_address);
                        else
                            console.log(status, response);
                    });
                    break;
                case "end":
                    this.manualAdd.steps[step].schedule[j].main_end.addListener("rightclick", function(){
                        me.manualAdd.steps[step].schedule[j].window_end.open(me.manualAdd.map.main, me.manualAdd.steps[step].schedule[j].main_end);
                    });
                    this.manualAdd.steps[step].schedule[j].window_end = new google.maps.InfoWindow({
                        content: "Dirección no encontrada.",
                        maxWidth: 175
                    });
                    this.manualAdd.map.geocoder.geocode({                          //Geocoder for placing
                        location: pos
                    },
                    function(response, status){
                        if(status === "OK" && response[0])
                            me.manualAdd.steps[step].schedule[j].window_end.setContent(response[0].formatted_address);
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
                step = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
            if(this.manualAdd.allPosVisible === 0 && !this.manualAdd.sameConf){
                for(i = 0; i < this.manualAdd.map.marker.length; i++)
                    for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++){
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
            else if(this.manualAdd.allPosVisible === 0 && this.manualAdd.sameConf){
                k = 0;
                for(j = 0; j < this.manualAdd.steps[k].schedule.length; j++){
                    if(this.manualAdd.steps[k].schedule[j].main_begin !== null &&
                       this.manualAdd.steps[k].schedule[j].lat_begin !== null &&
                       this.manualAdd.steps[k].schedule[j].lng_begin !== null){
                        counter++;
                        totalLat += this.manualAdd.steps[k].schedule[j].lat_begin;
                        totalLng += this.manualAdd.steps[k].schedule[j].lng_begin;
                        bounds.extend(this.manualAdd.steps[k].schedule[j].main_begin.getPosition());
                        
                       }
                    if(this.manualAdd.steps[k].schedule[j].main_end !== null &&
                       this.manualAdd.steps[k].schedule[j].lat_end !== null &&
                       this.manualAdd.steps[k].schedule[j].lng_end !== null){    //Is showed in map
                        counter++;
                        totalLat += this.manualAdd.steps[k].schedule[j].lat_end;
                        totalLng += this.manualAdd.steps[k].schedule[j].lng_end;
                        bounds.extend(this.manualAdd.steps[k].schedule[j].main_end.getPosition());
                    }
                }
            }
            else if(this.manualAdd.allPosVisible === 1){
                k = step;
                for(j = 0; j < this.manualAdd.steps[k].schedule.length; j++){
                    if(this.manualAdd.steps[k].schedule[j].main_begin !== null &&
                       this.manualAdd.steps[k].schedule[j].lat_begin !== null &&
                       this.manualAdd.steps[k].schedule[j].lng_begin !== null){
                        counter++;
                        totalLat += this.manualAdd.steps[k].schedule[j].lat_begin;
                        totalLng += this.manualAdd.steps[k].schedule[j].lng_begin;
                        bounds.extend(this.manualAdd.steps[k].schedule[j].main_begin.getPosition());
                        
                       }
                    if(this.manualAdd.steps[k].schedule[j].main_end !== null &&
                       this.manualAdd.steps[k].schedule[j].lat_end !== null &&
                       this.manualAdd.steps[k].schedule[j].lng_end !== null){    //Is showed in map
                        counter++;
                        totalLat += this.manualAdd.steps[k].schedule[j].lat_end;
                        totalLng += this.manualAdd.steps[k].schedule[j].lng_end;
                        bounds.extend(this.manualAdd.steps[k].schedule[j].main_end.getPosition());
                    }
                }
            }
            else{
                k = step;
                for(j = 0; j < this.manualAdd.steps[k].schedule.length; j++)
                    if(this.manualAdd.steps[k].schedule[j].active)
                        k2 = j;
                if(k2 !== false &&
                   this.manualAdd.steps[k].schedule[k2].main_begin !== null &&
                   this.manualAdd.steps[k].schedule[k2].lat_begin !== null &&
                   this.manualAdd.steps[k].schedule[k2].lng_begin !== null){
                    counter++;
                    totalLat += this.manualAdd.steps[k].schedule[k2].lat_begin;
                    totalLng += this.manualAdd.steps[k].schedule[k2].lng_begin;
                    bounds.extend(this.manualAdd.steps[k].schedule[k2].main_begin.getPosition());
                    
                   }
                if(k2 !== false &&
                   this.manualAdd.steps[k].schedule[k2].main_end !== null &&
                   this.manualAdd.steps[k].schedule[k2].lat_end !== null &&
                   this.manualAdd.steps[k].schedule[k2].lng_end !== null){    //Is showed in map
                    counter++;
                    totalLat += this.manualAdd.steps[k].schedule[k2].lat_end;
                    totalLng += this.manualAdd.steps[k].schedule[k2].lng_end;
                    bounds.extend(this.manualAdd.steps[k].schedule[k2].main_end.getPosition());
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
            else
                this.initGeocoder();
        },
        setActiveInterval: function(i){
            var step = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
            for(var j = 0; j < this.manualAdd.steps[step].schedule.length; j++)
                this.manualAdd.steps[step].schedule[j].active = j === i;
            if(this.manualAdd.allPosVisible === 2)
                this.setVisibilityPosition(true); //AUTO
        },
        positioner: function(pos){
            var step = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
            for(var j = 0; j < this.manualAdd.steps[step].schedule.length; j++)
                if(this.manualAdd.steps[step].active && this.manualAdd.steps[step].schedule[j].active){
                    if(this.manualAdd.steps[step].schedule[j].main_begin === null){
                        this.manualAdd.steps[step].schedule[j].main_begin = new google.maps.Marker({
                            map: this.manualAdd.map.main,
                            position: pos,
                            icon: {
                                url: "/image/maps/green-empty.png",
                                labelOrigin: new google.maps.Point(11, 11)
                            },
                            label: this.manualAdd.map.marker[step][this.manualAdd.sameConf ? "textU_begin" : "text"] + (j + 1),
                            title: "Inicio del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " para el día " + this.manualAdd.steps[this.manualAdd.actualStep].text),
                        });
                        this.manualAdd.steps[step].schedule[j].lat_begin = pos.lat();
                        this.manualAdd.steps[step].schedule[j].lng_begin = pos.lng();
                        this.getDirection("begin", pos, step, j);
                        this.deleter("begin", step, j);
                    }
                    else if(this.manualAdd.steps[step].schedule[j].main_begin &&
                            this.manualAdd.steps[step].schedule[j].lat_begin === null &&
                            this.manualAdd.steps[step].schedule[j].lng_begin === null){
                        this.manualAdd.steps[step].schedule[j].main_begin.setMap(this.manualAdd.map.main);
                        this.manualAdd.steps[step].schedule[j].main_begin.setPosition(pos);
                        this.manualAdd.steps[step].schedule[j].main_begin.setLabel(this.manualAdd.map.marker[step][this.manualAdd.sameConf ? "textU_begin" : "text"] + (j + 1));
                        this.manualAdd.steps[step].schedule[j].main_begin.setTitle("Inicio del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " para el día " + this.manualAdd.steps[this.manualAdd.actualStep].text));
                        this.manualAdd.steps[step].schedule[j].lat_begin = pos.lat();
                        this.manualAdd.steps[step].schedule[j].lng_begin = pos.lng();
                    }
                    else if(this.manualAdd.steps[step].schedule[j].main_begin &&
                            this.manualAdd.steps[step].schedule[j].main_end === null){
                        this.manualAdd.steps[step].schedule[j].main_end = new google.maps.Marker({
                            map: this.manualAdd.map.main,
                            position: pos,
                            icon: {
                                url: "/image/maps/red-empty.png",
                                labelOrigin: new google.maps.Point(11, 11)
                            },
                            label: this.manualAdd.map.marker[step][this.manualAdd.sameConf ? "textU_end" : "text"] + (j + 1),
                            title: "Final del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " para el día " + this.manualAdd.steps[this.manualAdd.actualStep].text),
                        });
                        this.manualAdd.steps[step].schedule[j].lat_end = pos.lat();
                        this.manualAdd.steps[step].schedule[j].lng_end = pos.lng();
                        this.getDirection("end", pos, step, j);
                        this.deleter("end", step, j);
                    }
                    else if(this.manualAdd.steps[step].schedule[j].main_end &&
                            this.manualAdd.steps[step].schedule[j].lat_end === null &&
                            this.manualAdd.steps[step].schedule[j].lng_end === null){
                        this.manualAdd.steps[step].schedule[j].main_end.setMap(this.manualAdd.map.main);
                        this.manualAdd.steps[step].schedule[j].main_end.setPosition(pos);
                        this.manualAdd.steps[step].schedule[j].main_end.setLabel(this.manualAdd.map.marker[step][this.manualAdd.sameConf ? "textU_end" : "text"] + (j + 1));
                        this.manualAdd.steps[step].schedule[j].main_end.setTitle("Final del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " para el día " + this.manualAdd.steps[this.manualAdd.actualStep].text));
                        this.manualAdd.steps[step].schedule[j].lat_end = pos.lat();
                        this.manualAdd.steps[step].schedule[j].lng_end = pos.lng();
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
            
            if(this.manualAdd.allPosVisible > 0)
                this.setVisibilityPosition(true); //AUTO
        },
        setInterval: function(){
            var step = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
            var i,
                newSchedule = [],
                interval = Math.floor(parseInt(this.manualAdd.steps[step].interval)) <= this.manualAdd.maxInterval ? Math.floor(parseInt(this.manualAdd.steps[step].interval)) : this.manualAdd.maxInterval,
                length = this.manualAdd.steps[step].schedule.length;
            if(!isNaN(Math.floor(parseInt(this.manualAdd.steps[step].interval)))){
                this.manualAdd.steps[step].interval = interval;
                if(this.manualAdd.steps[step].schedule.length < interval){
                    for(i = 0; i < interval - length; i++)
                        this.manualAdd.steps[step].schedule.push({
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
                            active: false
                        });
                }
                else if(length > interval){
                    for(i = 0; i < length; i++)
                        if(i < interval)
                            newSchedule.push(this.manualAdd.steps[step].schedule[i]);
                        else{
                            if(this.manualAdd.steps[step].schedule[i].main_begin !== null &&
                                this.manualAdd.steps[step].schedule[i].lat_begin !== null &&
                                this.manualAdd.steps[step].schedule[i].lng_begin !== null)
                                 this.manualAdd.steps[step].schedule[i].main_begin.setMap(null);
                            if(this.manualAdd.steps[step].schedule[i].main_end !== null &&
                               this.manualAdd.steps[step].schedule[i].lat_end !== null &&
                               this.manualAdd.steps[step].schedule[i].lng_end !== null)    //Is showed in map
                                this.manualAdd.steps[step].schedule[i].main_end.setMap(null);
                        }
                    this.manualAdd.steps[step].schedule = newSchedule;
                    this.setActivity(true);
                }
                if(this.manualAdd.steps[step].schedule.length > 0)
                    this.setActiveInterval(0);
            }
        },
        setActivity: function(auto){
            if(!auto)
                this.manualAdd.steps[this.manualAdd.actualStep].active = !this.manualAdd.steps[this.manualAdd.actualStep].active;
            if(!this.manualAdd.steps[this.manualAdd.actualStep].active){
                for(var j = 0; j < this.manualAdd.steps[this.manualAdd.actualStep].schedule.length; j++){
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
        validation: function(type, i, j, k){
            var step = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
            switch(type){
                case "name":
                    if(this.typeSelection.type === 1){
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
                    }
                    else{
                        this.importer.resource[i].name.valid = false;
                        if(this.importer.resource[i].name.value === null ||
                           this.importer.resource[i].name.value === "")
                            this.importer.resource[i].name.text = "Nombre no puede estar vacío";
                        else if(this.importer.resource[i].name.value.length < 8)
                            this.importer.resource[i].name.text = "Nombre debe contener al menos 8 caracteres";
                        else{
                            this.importer.resource[i].name.text = "";
                            this.importer.resource[i].name.valid = true;
                        }
                    }
                    break;
                case "email":
                    var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(this.typeSelection.type === 1){
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
                    }
                    else{
                        this.importer.resource[i].email.valid = false;
                        if(this.importer.resource[i].email.value === null ||
                           this.importer.resource[i].email.value === "")
                            this.importer.resource[i].email.text = "Correo electrónico no puede estar vacío";
                        else if(!emailTest.test(this.importer.resource[i].email.value))
                            this.importer.resource[i].email.text = "Correo electrónico no tiene una forma válida";
                        else{
                            this.importer.resource[i].email.text = "";
                            this.importer.resource[i].email.valid = true;
                        }
                    }
                    break;
                case "pass":
                    if(this.typeSelection.type === 1){
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
                    }
                    else{
                        this.importer.resource[i].pass.valid = false;
                        if(this.importer.resource[i].pass.value === null ||
                           this.importer.resource[i].pass.value === "")
                            this.importer.resource[i].pass.text = "Contraseña no puede estar vacío";
                        else if(this.importer.resource[i].pass.value.length < 8)
                            this.importer.resource[i].pass.text = "Contraseña debe contener al menos 8 caracteres";
                        else{
                            this.importer.resource[i].pass.text = "";
                            this.importer.resource[i].pass.valid = true;
                        }
                    }
                    break;
                case "repass":
                    if(this.typeSelection.type === 1){
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
                    }
                    else{
                        this.importer.resource[i].repass.valid = false;
                        if(this.importer.resource[i].repass.value === null ||
                           this.importer.resource[i].repass.value === "")
                            this.importer.resource[i].repass.text = "Confirmar contraseña no puede estar vacío";
                        else if(this.importer.resource[i].repass.value !== this.importer.resource[i].pass.value)
                            this.importer.resource[i].repass.text = "Las contraseñas no coinciden";
                        else{
                            this.importer.resource[i].repass.text = "";
                            this.importer.resource[i].repass.valid = true;
                        }
                    }
                    break;
                case "phone":
                    if(this.typeSelection.type === 1){
                        this.manualAdd.phone.valid = false;
                        if(this.manualAdd.phone.value === null ||
                           this.manualAdd.phone.value === "")
                            this.manualAdd.phone.text = "Teléfono no puede estar vacío";
                        else if(this.manualAdd.phone.value.length < 10 ||
                                this.manualAdd.phone.value.length > 10)
                            this.manualAdd.phone.text = "Teléfono debe contener 10 dígitos";
                        else{
                            this.manualAdd.phone.text = "";
                            this.manualAdd.phone.valid = true;
                        }
                    }
                    else{
                        this.importer.resource[i].phone.valid = false;
                        if(this.importer.resource[i].phone.value === null ||
                           this.importer.resource[i].phone.value === "")
                            this.importer.resource[i].phone.text = "Teléfono no puede estar vacío";
                        else if(this.importer.resource[i].phone.value.length < 10 ||
                                this.importer.resource[i].phone.value.length > 10)
                            this.importer.resource[i].phone.text = "Teléfono debe contener 10 dígitos";
                        else{
                            this.importer.resource[i].phone.text = "";
                            this.importer.resource[i].phone.valid = true;
                        }
                    }
                    break;
                case "time-begin":
                    if(this.typeSelection.type === 1){
                        this.manualAdd.steps[step].schedule[i].validBegin = false;
                        if(this.manualAdd.steps[step].schedule[i].begin === "")
                            this.manualAdd.steps[step].schedule[i].textBegin = "El inicio del intervalo no puede estar vacío";
                        else if(this.manualAdd.steps[step].schedule[i].begin.length !== 8)
                            this.manualAdd.steps[step].schedule[i].textBegin = "El inicio del intervalo no tiene un formato apropiado";
                        else{
                            this.manualAdd.steps[step].schedule[i].textBegin = "hh:mm:ss";
                            this.manualAdd.steps[step].schedule[i].validBegin = true;
                        }
                    }
                    else{
                        this.importer.resource[i].steps[j].schedule[k].validBegin = false;
                        if(this.importer.resource[i].steps[j].schedule[k].begin === "")
                            this.importer.resource[i].steps[j].schedule[k].textBegin = "El inicio del intervalo no puede estar vacío";
                        else if(this.importer.resource[i].steps[j].schedule[k].begin.length !== 8)
                            this.importer.resource[i].steps[j].schedule[k].textBegin = "El inicio del intervalo no tiene un formato apropiado";
                        else{
                            this.importer.resource[i].steps[j].schedule[k].textBegin = "hh:mm:ss";
                            this.importer.resource[i].steps[j].schedule[k].validBegin = true;
                        }
                    }
                    break;
                case "time-end":
                    if(this.typeSelection.type === 1){
                        this.manualAdd.steps[step].schedule[i].validEnd = false;
                        if(this.manualAdd.steps[step].schedule[i].end === "")
                            this.manualAdd.steps[step].schedule[i].textEnd = "El final del intervalo no puede estar vacío";
                        else if(this.manualAdd.steps[step].schedule[i].end.length !== 8)
                            this.manualAdd.steps[step].schedule[i].textEnd = "El final del intervalo no tiene un formato apropiado";
                        else{
                            this.manualAdd.steps[step].schedule[i].textEnd = "hh:mm:ss";
                            this.manualAdd.steps[step].schedule[i].validEnd = true;
                        }
                    }
                    else{
                        this.importer.resource[i].steps[j].schedule[k].validEnd = false;
                        if(this.importer.resource[i].steps[j].schedule[k].end === "")
                            this.importer.resource[i].steps[j].schedule[k].textEnd = "El inicio del intervalo no puede estar vacío";
                        else if(this.importer.resource[i].steps[j].schedule[k].end.length !== 8)
                            this.importer.resource[i].steps[j].schedule[k].textEnd = "El inicio del intervalo no tiene un formato apropiado";
                        else{
                            this.importer.resource[i].steps[j].schedule[k].textEnd = "hh:mm:ss";
                            this.importer.resource[i].steps[j].schedule[k].validEnd = true;
                        }
                    }
                    break;
            }
        },
        changeFile: function(e){
            this.importer.file.text = "No has seleccionado ningún archivo";
            this.importer.file.value = null;
            if(e.target.files.length > 0 &&
            (e.target.files[0].type === "application/vnd.oasis.opendocument.spreadsheet" ||
            e.target.files[0].type === "application/vnd.oasis.opendocument.spreadsheet-template" ||
            e.target.files[0].type === "application/vnd.ms-excel" ||
            e.target.files[0].type === "application/vnd.ms-excel.sheet.macroEnabled.12" ||
            e.target.files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
                this.importer.file.text = e.target.files[0].name;
                this.importer.file.value = e.target.files[0];
            }
            else if(e.target.files.length > 0){
                BUTO.components.main.alert.description.title = "Errores en importación de datos";
                BUTO.components.main.alert.description.text = "Tipo de archivo inválido.<br>Las extensiones válidas para importar clientes son .xls, .xlsx, .xlsm, .ods y .ots.<br>Inténtalo de nuevo.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            }
        },
        process: function(){
            var me = this,
                i, j = null, k, length, workbook, data, delimiterType, value, headers,
                reader = new FileReader();
            this.importer.resource = [];
            this.importer.editIndex = null;
            this.importer.variant.nameId = null;
            this.importer.variant.emailId = null;
            this.importer.variant.passwordId = null;
            this.importer.variant.rePasswordId = null;
            this.importer.variant.phoneId = null;
            this.importer.variant.dayId = null;
            this.importer.variant.beginAddressId = null;
            this.importer.variant.endAddressId = null;
            this.importer.variant.scheduleId = null;
            //BUTO.components.main.loader.active = true;
            reader.onload = function(e){
                workbook = me.importer.plugins.xlsx.read(e.target.result, {type: "binary"});
                headers = [];
                if(workbook.Strings.length >= 9){
                    for(i = 0; i < 9; i++)
                        headers.push(workbook.Strings[i].h);
                    data = me.importer.plugins.xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {raw: true});
                    length = data.length;
                }
                else
                    length = 0;
                if(length > 0){
                    for(i = 0; i < me.importer.variant.name.length; i++)
                        if(headers.indexOf(me.importer.variant.name[i].id) !== -1)
                            me.importer.variant.nameId = me.importer.variant.name[i].id;
                    for(i = 0; i < me.importer.variant.email.length; i++)
                        if(headers.indexOf(me.importer.variant.email[i].id) !== -1)
                            me.importer.variant.emailId = me.importer.variant.email[i].id;
                    for(i = 0; i < me.importer.variant.password.length; i++)
                        if(headers.indexOf(me.importer.variant.password[i].id) !== -1)
                            me.importer.variant.passwordId = me.importer.variant.password[i].id;
                    for(i = 0; i < me.importer.variant.rePassword.length; i++)
                        if(headers.indexOf(me.importer.variant.rePassword[i].id) !== -1)
                            me.importer.variant.rePasswordId = me.importer.variant.rePassword[i].id;
                    for(i = 0; i < me.importer.variant.phone.length; i++)
                        if(headers.indexOf(me.importer.variant.phone[i].id) !== -1)
                            me.importer.variant.phoneId = me.importer.variant.phone[i].id;
                    for(i = 0; i < me.importer.variant.day.length; i++)
                        if(headers.indexOf(me.importer.variant.day[i].id) !== -1)
                            me.importer.variant.dayId = me.importer.variant.day[i].id;
                    for(i = 0; i < me.importer.variant.beginAddress.length; i++)
                        if(headers.indexOf(me.importer.variant.beginAddress[i].id) !== -1)
                            me.importer.variant.beginAddressId = me.importer.variant.beginAddress[i].id;
                    for(i = 0; i < me.importer.variant.endAddress.length; i++)
                        if(headers.indexOf(me.importer.variant.endAddress[i].id) !== -1)
                            me.importer.variant.endAddressId = me.importer.variant.endAddress[i].id;
                    for(i = 0; i < me.importer.variant.schedule.length; i++)
                        if(headers.indexOf(me.importer.variant.schedule[i].id) !== -1)
                            me.importer.variant.scheduleId = me.importer.variant.schedule[i].id;
                    if(me.importer.variant.nameId !== null &&
                       me.importer.variant.emailId !== null &&
                       me.importer.variant.passwordId !== null &&
                       me.importer.variant.rePasswordId !== null &&
                       me.importer.variant.phoneId !== null &&
                       me.importer.variant.dayId !== null &&
                       me.importer.variant.beginAddressId !== null &&
                       me.importer.variant.endAddressId !== null &&
                       me.importer.variant.scheduleId !== null){
                        me.initGeocoder();
                        for(i = 0; i < length; i++){
                            if(data[i][me.importer.variant.nameId] !== undefined &&
                               data[i][me.importer.variant.emailId] !== undefined &&
                               (data[i][me.importer.variant.passwordId] !== undefined ||
                               data[i][me.importer.variant.rePasswordId] !== undefined ||
                               data[i][me.importer.variant.phoneId] !== undefined)){
                                j = me.importer.resource.length;
                                me.importer.resource.push({
                                    name: {
                                        value: data[i][me.importer.variant.nameId] === undefined ? "" : data[i][me.importer.variant.nameId],
                                        valid: false,
                                        text: ""
                                    },
                                    email: {
                                        value: data[i][me.importer.variant.emailId] === undefined ? "" : data[i][me.importer.variant.emailId],
                                        valid: false,
                                        text: ""
                                    },
                                    pass: {
                                        value: data[i][me.importer.variant.passwordId] === undefined ? "" : data[i][me.importer.variant.passwordId].toString(),
                                        valid: false,
                                        text: ""
                                    },
                                    repass: {
                                        value: data[i][me.importer.variant.rePasswordId] === undefined ? "" : data[i][me.importer.variant.rePasswordId].toString(),
                                        valid: false,
                                        text: ""
                                    },
                                    phone: {
                                        value: (data[i][me.importer.variant.phoneId] === undefined || typeof data[i][me.importer.variant.phoneId] !== "number") ? "" : data[i][me.importer.variant.phoneId].toString(),
                                        valid: false,
                                        text: ""
                                    },
                                    marker: [
                                        { text: "Lu" },
                                        { text: "Ma" },
                                        { text: "Mi" },
                                        { text: "Ju" },
                                        { text: "Vi" },
                                        { text: "Sa" },
                                        { text: "Do" }
                                    ],
                                    valid: true,
                                    allPosVisible: 0,
                                    actualStep: 0,
                                    steps: [
                                        {
                                            text: "Lunes",
                                            dayNumber: 2,
                                            active: false,
                                            schedule: [],
                                            interval: 1,
                                            seen: true
                                        },
                                        {
                                            text: "Martes",
                                            dayNumber: 3,
                                            active: false,
                                            schedule: [],
                                            interval: 1,
                                            seen: true
                                        },
                                        {
                                            text: "Miércoles",
                                            dayNumber: 4,
                                            active: false,
                                            schedule: [],
                                            interval: 1,
                                            seen: true
                                        },
                                        {
                                            text: "Jueves",
                                            dayNumber: 5,
                                            active: false,
                                            schedule: [],
                                            interval: 1,
                                            seen: true
                                        },
                                        {
                                            text: "Viernes",
                                            dayNumber: 6,
                                            active: false,
                                            schedule: [],
                                            interval: 1,
                                            seen: true
                                        },
                                        {
                                            text: "Sábado",
                                            dayNumber: 7,
                                            active: false,
                                            schedule: [],
                                            interval: 1,
                                            seen: true
                                        },
                                        {
                                            text: "Domingo",
                                            dayNumber: 1,
                                            active: false,
                                            schedule: [],
                                            interval: 1,
                                            seen: true
                                        },
                                    ]
                                });
                                me.validation("name", j);
                                me.validation("email", j);
                                me.validation("pass", j);
                                me.validation("repass", j);
                                me.validation("phone", j);
                            }
                            if(j !== null){
                                k = me.importer.variant.monday.indexOf(data[i][me.importer.variant.dayId]);
                                if(k !== -1 &&
                                   me.importer.resource[j].steps[0].schedule.length <= me.manualAdd.maxInterval){
                                    value = data[i][me.importer.variant.scheduleId] !== undefined ?
                                        typeof data[i][me.importer.variant.scheduleId] !== "string" ? data[i][me.importer.variant.scheduleId].toString() : data[i][me.importer.variant.scheduleId] :
                                        "";
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.resource[j].steps[0].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss",
                                        
                                        address_begin: data[i][me.importer.variant.beginAddressId] !== undefined ? data[i][me.importer.variant.beginAddressId] : "",
                                        address_end: data[i][me.importer.variant.endAddressId] !== undefined ? data[i][me.importer.variant.endAddressId] : "",
                                        main_begin: null,
                                        main_end: null,
                                        window_begin: null,
                                        window_end: null,
                                        lat_begin: null,
                                        lng_begin: null,
                                        lat_end: null,
                                        lng_end: null,
                                        active: me.importer.resource[j].steps[0].schedule.length === 0
                                    });
                                    me.importer.resource[j].steps[0].interval = me.importer.resource[j].steps[0].schedule.length;
                                    if(!me.importer.resource[j].steps[0].active)
                                        me.importer.resource[j].steps[0].active = true;
                                    me.validation("time-begin", j, 0, me.importer.resource[j].steps[0].interval - 1);
                                    me.validation("time-end", j, 0, me.importer.resource[j].steps[0].interval - 1);
                                    //me.getLocation(j, 0, me.importer.resource[j].steps[0].interval - 1);
                                }
                                
                                k = me.importer.variant.tuesday.indexOf(data[i][me.importer.variant.dayId]);
                                if(k !== -1 &&
                                   me.importer.resource[j].steps[1].schedule.length <= me.manualAdd.maxInterval){
                                    value = data[i][me.importer.variant.scheduleId] !== undefined ?
                                        typeof data[i][me.importer.variant.scheduleId] !== "string" ? data[i][me.importer.variant.scheduleId].toString() : data[i][me.importer.variant.scheduleId] :
                                        "";
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.resource[j].steps[1].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss",
                                        
                                        address_begin: data[i][me.importer.variant.beginAddressId] !== undefined ? data[i][me.importer.variant.beginAddressId] : "",
                                        address_end: data[i][me.importer.variant.endAddressId] !== undefined ? data[i][me.importer.variant.endAddressId] : "",
                                        main_begin: null,
                                        main_end: null,
                                        window_begin: null,
                                        window_end: null,
                                        lat_begin: null,
                                        lng_begin: null,
                                        lat_end: null,
                                        lng_end: null,
                                        active: me.importer.resource[j].steps[1].schedule.length === 0
                                    });
                                    me.importer.resource[j].steps[1].interval = me.importer.resource[j].steps[1].schedule.length;
                                    if(!me.importer.resource[j].steps[1].active)
                                        me.importer.resource[j].steps[1].active = true;
                                    me.validation("time-begin", j, 1, me.importer.resource[j].steps[1].interval - 1);
                                    me.validation("time-end", j, 1, me.importer.resource[j].steps[1].interval - 1);
                                    //me.getLocation(j, 1, me.importer.resource[j].steps[1].interval - 1);
                                }
                                
                                k = me.importer.variant.wednesday.indexOf(data[i][me.importer.variant.dayId]);
                                if(k !== -1 &&
                                   me.importer.resource[j].steps[2].schedule.length <= me.manualAdd.maxInterval){
                                    value = data[i][me.importer.variant.scheduleId] !== undefined ?
                                        typeof data[i][me.importer.variant.scheduleId] !== "string" ? data[i][me.importer.variant.scheduleId].toString() : data[i][me.importer.variant.scheduleId] :
                                        "";
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.resource[j].steps[2].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss",
                                        
                                        address_begin: data[i][me.importer.variant.beginAddressId] !== undefined ? data[i][me.importer.variant.beginAddressId] : "",
                                        address_end: data[i][me.importer.variant.endAddressId] !== undefined ? data[i][me.importer.variant.endAddressId] : "",
                                        main_begin: null,
                                        main_end: null,
                                        window_begin: null,
                                        window_end: null,
                                        lat_begin: null,
                                        lng_begin: null,
                                        lat_end: null,
                                        lng_end: null,
                                        active: me.importer.resource[j].steps[2].schedule.length === 0
                                    });
                                    me.importer.resource[j].steps[2].interval = me.importer.resource[j].steps[2].schedule.length;
                                    if(!me.importer.resource[j].steps[2].active)
                                        me.importer.resource[j].steps[2].active = true;
                                    me.validation("time-begin", j, 2, me.importer.resource[j].steps[2].interval - 1);
                                    me.validation("time-end", j, 2, me.importer.resource[j].steps[2].interval - 1);
                                    //me.getLocation(j, 2, me.importer.resource[j].steps[2].interval - 1);
                                }
                                
                                k = me.importer.variant.thursday.indexOf(data[i][me.importer.variant.dayId]);
                                if(k !== -1 &&
                                   me.importer.resource[j].steps[3].schedule.length <= me.manualAdd.maxInterval){
                                    value = data[i][me.importer.variant.scheduleId] !== undefined ?
                                        typeof data[i][me.importer.variant.scheduleId] !== "string" ? data[i][me.importer.variant.scheduleId].toString() : data[i][me.importer.variant.scheduleId] :
                                        "";
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.resource[j].steps[3].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss",
                                        
                                        address_begin: data[i][me.importer.variant.beginAddressId] !== undefined ? data[i][me.importer.variant.beginAddressId] : "",
                                        address_end: data[i][me.importer.variant.endAddressId] !== undefined ? data[i][me.importer.variant.endAddressId] : "",
                                        main_begin: null,
                                        main_end: null,
                                        window_begin: null,
                                        window_end: null,
                                        lat_begin: null,
                                        lng_begin: null,
                                        lat_end: null,
                                        lng_end: null,
                                        active: me.importer.resource[j].steps[3].schedule.length === 0
                                    });
                                    me.importer.resource[j].steps[3].interval = me.importer.resource[j].steps[3].schedule.length;
                                    if(!me.importer.resource[j].steps[3].active)
                                        me.importer.resource[j].steps[3].active = true;
                                    me.validation("time-begin", j, 3, me.importer.resource[j].steps[3].interval - 1);
                                    me.validation("time-end", j, 3, me.importer.resource[j].steps[3].interval - 1);
                                    //me.getLocation(j, 3, me.importer.resource[j].steps[3].interval - 1);
                                }
                                
                                k = me.importer.variant.friday.indexOf(data[i][me.importer.variant.dayId]);
                                if(k !== -1 &&
                                   me.importer.resource[j].steps[4].schedule.length <= me.manualAdd.maxInterval){
                                    value = data[i][me.importer.variant.scheduleId] !== undefined ?
                                        typeof data[i][me.importer.variant.scheduleId] !== "string" ? data[i][me.importer.variant.scheduleId].toString() : data[i][me.importer.variant.scheduleId] :
                                        "";
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.resource[j].steps[4].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss",
                                        
                                        address_begin: data[i][me.importer.variant.beginAddressId] !== undefined ? data[i][me.importer.variant.beginAddressId] : "",
                                        address_end: data[i][me.importer.variant.endAddressId] !== undefined ? data[i][me.importer.variant.endAddressId] : "",
                                        main_begin: null,
                                        main_end: null,
                                        window_begin: null,
                                        window_end: null,
                                        lat_begin: null,
                                        lng_begin: null,
                                        lat_end: null,
                                        lng_end: null,
                                        active: me.importer.resource[j].steps[4].schedule.length === 0
                                    });
                                    me.importer.resource[j].steps[4].interval = me.importer.resource[j].steps[4].schedule.length;
                                    if(!me.importer.resource[j].steps[4].active)
                                        me.importer.resource[j].steps[4].active = true;
                                    me.validation("time-begin", j, 4, me.importer.resource[j].steps[4].interval - 1);
                                    me.validation("time-end", j, 4, me.importer.resource[j].steps[4].interval - 1);
                                    //me.getLocation(j, 4, me.importer.resource[j].steps[4].interval - 1);
                                }
                                
                                k = me.importer.variant.saturday.indexOf(data[i][me.importer.variant.dayId]);
                                if(k !== -1 &&
                                   me.importer.resource[j].steps[5].schedule.length <= me.manualAdd.maxInterval){
                                    value = data[i][me.importer.variant.scheduleId] !== undefined ?
                                        typeof data[i][me.importer.variant.scheduleId] !== "string" ? data[i][me.importer.variant.scheduleId].toString() : data[i][me.importer.variant.scheduleId] :
                                        "";
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.resource[j].steps[5].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss",
                                        
                                        address_begin: data[i][me.importer.variant.beginAddressId] !== undefined ? data[i][me.importer.variant.beginAddressId] : "",
                                        address_end: data[i][me.importer.variant.endAddressId] !== undefined ? data[i][me.importer.variant.endAddressId] : "",
                                        main_begin: null,
                                        main_end: null,
                                        window_begin: null,
                                        window_end: null,
                                        lat_begin: null,
                                        lng_begin: null,
                                        lat_end: null,
                                        lng_end: null,
                                        active: me.importer.resource[j].steps[5].schedule.length === 0
                                    });
                                    me.importer.resource[j].steps[5].interval = me.importer.resource[j].steps[5].schedule.length;
                                    if(!me.importer.resource[j].steps[5].active)
                                        me.importer.resource[j].steps[5].active = true;
                                    me.validation("time-begin", j, 5, me.importer.resource[j].steps[5].interval - 1);
                                    me.validation("time-end", j, 5, me.importer.resource[j].steps[5].interval - 1);
                                    //me.getLocation(j, 5, me.importer.resource[j].steps[5].interval - 1);
                                }
                                
                                k = me.importer.variant.sunday.indexOf(data[i][me.importer.variant.dayId]);
                                if(k !== -1 &&
                                   me.importer.resource[j].steps[6].schedule.length <= me.manualAdd.maxInterval){
                                    value = data[i][me.importer.variant.scheduleId] !== undefined ?
                                        typeof data[i][me.importer.variant.scheduleId] !== "string" ? data[i][me.importer.variant.scheduleId].toString() : data[i][me.importer.variant.scheduleId] :
                                        "";
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.resource[j].steps[6].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss",
                                        
                                        address_begin: data[i][me.importer.variant.beginAddressId] !== undefined ? data[i][me.importer.variant.beginAddressId] : "",
                                        address_end: data[i][me.importer.variant.endAddressId] !== undefined ? data[i][me.importer.variant.endAddressId] : "",
                                        main_begin: null,
                                        main_end: null,
                                        window_begin: null,
                                        window_end: null,
                                        lat_begin: null,
                                        lng_begin: null,
                                        lat_end: null,
                                        lng_end: null,
                                        active: me.importer.resource[j].steps[6].schedule.length === 0
                                    });
                                    me.importer.resource[j].steps[6].interval = me.importer.resource[j].steps[6].schedule.length;
                                    if(!me.importer.resource[j].steps[6].active)
                                        me.importer.resource[j].steps[6].active = true;
                                    me.validation("time-begin", j, 6, me.importer.resource[j].steps[6].interval - 1);
                                    me.validation("time-end", j, 6, me.importer.resource[j].steps[6].interval - 1);
                                    //me.getLocation(j, 6, me.importer.resource[j].steps[6].interval - 1);
                                }
                            }
                        }
                        console.log(me.importer.resource);
                    }
                    else{
                        BUTO.components.main.alert.description.text = "No se pudo identificar una columna apropiada para obtener: ";
                        if(me.importer.variant.nameId === null)
                            BUTO.components.main.alert.description.text += "<br> - Nombre";
                        if(me.importer.variant.emailId === null)
                            BUTO.components.main.alert.description.text += "<br> - Correo";
                        if(me.importer.variant.passwordId === null)
                            BUTO.components.main.alert.description.text += "<br> - Contraseña";
                        if(me.importer.variant.rePasswordId === null)
                            BUTO.components.main.alert.description.text += "<br> - Confirmar Contraseña";
                        if(me.importer.variant.phoneId === null)
                            BUTO.components.main.alert.description.text += "<br> - Teléfono";
                        if(me.importer.variant.dayId === null)
                            BUTO.components.main.alert.description.text += "<br> - Día";
                        if(me.importer.variant.beginAddressId === null)
                            BUTO.components.main.alert.description.text += "<br> - Dirección Inicio";
                        if(me.importer.variant.endAddressId === null)
                            BUTO.components.main.alert.description.text += "<br> - Dirección Fin";
                        if(me.importer.variant.scheduleId === null)
                            BUTO.components.main.alert.description.text += "<br> - Horario";
                        BUTO.components.main.alert.description.title = "Errores en importación de datos";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    //BUTO.components.main.loader.active = false;
                }
                else{
                    BUTO.components.main.alert.description.title = "Errores en importación de datos";
                    BUTO.components.main.alert.description.text = "No se pudieron identificar datos en este archivo.";
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                    BUTO.components.main.loader.active = false;
                }
            };
            reader.readAsBinaryString(this.importer.file.value);
        },
        getLocation: function(i){
            //var me = this;
            //this.importer.map.geocoder.geocode({                          //Geocoder for placing
            //    address: this.importer.store[i].marker.data.address
            //},
            //function(response, status){
            //    if(status === "OK"){
            //        me.importer.store[i].marker.position.lat = response[0].geometry.location.lat();
            //        me.importer.store[i].marker.position.lng = response[0].geometry.location.lng();
            //    }
            //    else
            //        console.log(status);
            //});
        },
        remove: function(i){
            //var j, newStore = [], length = this.importer.store.length;
            //for(j = 0; j < length; j++)
            //    if(j !== i)
            //        newStore.push(this.importer.store[j]);
            //this.importer.store = newStore;
        },
        edit: function(i){
            //var me = this;
            //this.importer.editIndex = i;
            //if(this.importer.first){
            //    Vue.nextTick(function(){
            //        setTimeout(function(){
            //            me.initMap();
            //            me.positioner(me.importer.store[i].marker.position, true);
            //            me.importer.first = false;
            //        }, 250);
            //    });
            //}
            //else
            //    this.positioner(this.importer.store[i].marker.position, true);
        },
        submit: function(e){
            var me = this;
            switch(e){
                case "manual":
                    var i, j, k = 0, limit = 4,
                        first = true,
                        hmdB, hmdE,
                        error = "",
                        valid = true,
                        emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
                    else if(valid && (this.manualAdd.email.value === null || this.manualAdd.email.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Correo electrónico no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.email.valid = false;
                        this.manualAdd.email.text = "Correo electrónico no puede estar vacío";
                        valid = false;
                    }
                    else if(valid && !emailTest.test(this.manualAdd.email.value)){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Correo electrónico no tiene una forma válida.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.email.valid = false;
                        this.manualAdd.email.text = "Correo electrónico no tiene una forma válida";
                        valid = false;
                    }
                    else if(valid && (this.manualAdd.pass.value === null || this.manualAdd.pass.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Contraseña no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.pass.valid = false;
                        this.manualAdd.pass.text = "Contraseña no puede estar vacío";
                        valid = false;
                    }
                    else if(valid && this.manualAdd.pass.value.length < 8){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Contraseña debe contener al menos 8 caracteres.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.manualAdd.pass.valid = false;
                            this.manualAdd.pass.text = "Contraseña debe contener al menos 8 caracteres";
                            valid = false;
                    }
                    else if(valid && (this.manualAdd.repass.value === null || this.manualAdd.repass.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Confirmar contraseña no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.repass.valid = false;
                        this.manualAdd.repass.text = "Confirmar contraseña no puede estar vacío";
                        valid = false;
                    }
                    else if(valid && (this.manualAdd.repass.value !== this.manualAdd.pass.value)){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Las contraseñas no coinciden.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.repass.valid = false;
                        this.manualAdd.repass.text = "Las contraseñas no coinciden";
                        valid = false;
                    }
                    else if(valid && (this.manualAdd.phone.value === null || this.manualAdd.phone.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Teléfono no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.phone.valid = false;
                        this.manualAdd.phone.text = "Teléfono no puede estar vacío";
                        valid = false;
                    }
                    else if(valid && this.manualAdd.phone.value.length < 10){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Teléfono debe contener al menos 10 dígitos.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.phone.valid = false;
                        this.manualAdd.phone.text = "Teléfono debe contener al menos 10 dígitos";
                        valid = false;
                    }
                    else if(valid && this.manualAdd.phone.value.length > 13){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Teléfono debe contener como máximo 13 dígitos.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.phone.valid = false;
                        this.manualAdd.phone.text = "Teléfono debe contener como máximo 13 dígitos";
                        valid = false;
                    }
                    else if(valid){
                        for(i = 0; i < (this.manualAdd.sameConf ? 1 : this.manualAdd.steps.length); i++){
                            if(this.manualAdd.steps[i].active)
                                for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++)
                                    if(this.manualAdd.steps[i].schedule[j].main_begin === null ||                  //No position
                                        this.manualAdd.steps[i].schedule[j].lat_begin === null ||
                                        this.manualAdd.steps[i].schedule[j].lng_begin === null ||
                                        this.manualAdd.steps[i].schedule[j].main_end === null ||                  //No position
                                        this.manualAdd.steps[i].schedule[j].lat_end === null ||
                                        this.manualAdd.steps[i].schedule[j].lng_end === null){
                                        error += (k <= limit) ? "Debes escoger las ubicaciones de inicio y final del intervalo " + (j + 1) + (this.manualAdd.sameConf ? "" : " para el día " + this.manualAdd.steps[i].text) + ".<br>": "";
                                        valid = false; k++;
                                 }
                        }
                        if(valid){
                            error = "";
                            k = 0;
                            for(i = 0; i < (this.manualAdd.sameConf ? 1 : this.manualAdd.steps.length); i++)
                                if(this.manualAdd.steps[i].active && this.manualAdd.steps[i].schedule.length > 0)
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
                                    telefono: this.manualAdd.phone.value
                                }
                            },function(success){
                                for(i = 0; i < me.manualAdd.steps.length; i++)
                                    if((me.manualAdd.steps[i].active && me.manualAdd.steps[i].schedule.length > 0) || me.manualAdd.sameConf){
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
                    lat_inicio: this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule[j].lat_begin,
                    lat_fin: this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule[j].lat_end,
                    lng_inicio: this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule[j].lng_begin,
                    lng_fin: this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule[j].lng_end
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
                    this.manualAdd.phone.value = null;
                    this.manualAdd.actualStep = 0;
                    this.manualAdd.allPosVisible = 0;
                    break;
                case "schedule":
                    this.manualAdd.steps[i].active = true;
                    this.manualAdd.steps[i].interval = 1;
                    this.manualAdd.steps[i].seen = (this.manualAdd.steps[i].dayNumber === 2) ? true : false;
                    if(!this.manualAdd.sameConf){
                        if(!this.manualAdd.sameConf && j !== null){
                            if(this.manualAdd.steps[i].schedule[j].main_begin !== null)
                                this.manualAdd.steps[i].schedule[j].main_begin.setMap(null);
                            if(this.manualAdd.steps[i].schedule[j].main_end !== null)
                                this.manualAdd.steps[i].schedule[j].main_end.setMap(null);
                        }
                        else if(!this.manualAdd.sameConf && j === null){
                            for(j = 0; j < this.manualAdd.steps[i].length; j++){
                                if(this.manualAdd.steps[i].schedule[j].main_begin !== null)
                                this.manualAdd.steps[i].schedule[j].main_begin.setMap(null);
                            if(this.manualAdd.steps[i].schedule[j].main_end !== null)
                                this.manualAdd.steps[i].schedule[j].main_end.setMap(null);
                            }
                        }
                    }
                    if(this.manualAdd.steps[i].dayNumber === 1 &&
                        j === this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule.length - 1)
                        this.reset("all");
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
                    this.manualAdd.phone.value = null;
                    this.manualAdd.phone.valid = true;
                    this.manualAdd.actualStep = 0;
                    this.manualAdd.allPosVisible = 0;
                    this.manualAdd.sameConf = false;
                    
                    for(i = 0; i < this.manualAdd.steps.length; i++){
                        for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++){
                            if(this.manualAdd.steps[i].schedule[j].main_begin !== null)
                                this.manualAdd.steps[i].schedule[j].main_begin.setMap(null);
                            if(this.manualAdd.steps[i].schedule[j].main_end !== null)
                                this.manualAdd.steps[i].schedule[j].main_end.setMap(null);
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
                            window_begin: null,
                            window_end: null,
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