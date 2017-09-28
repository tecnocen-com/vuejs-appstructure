module.exports = new Vue({
    data: {
        models: {
            sucursal: null,
            sucursalHorario: null
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
                marker: {
                    main: null,
                    window: null
                },
                data: {
                    address: "Ciudad de México, México",
                    zoom: 13
                }
            },
            store: [],
            total: 0,
            valid: true,
            variant: {
                nameId: null,
                addressId: null,
                mondayId: null,
                tuesdayId: null,
                wednesdayId: null,
                thursdayId: null,
                fridayId: null,
                saturdayId: null,
                sundayId: null,
                name: [
                    {
                        id: "Nombre"
                    },
                    {
                        id: "nombre"
                    },
                    {
                        id: "NOMBRE"
                    }
                ],
                address: [
                    {
                        id: "Dirección"
                    },
                    {
                        id: "dirección"
                    },
                    {
                        id: "DIRECCIÓN"
                    },
                    {
                        id: "Direccion"
                    },
                    {
                        id: "direccion"
                    },
                    {
                        id: "DIRECCION"
                    }
                ],
                monday: [
                    {
                        id: "Lunes"
                    },
                    {
                        id: "lunes"
                    },
                    {
                        id: "LUNES"
                    }
                ],
                tuesday: [
                    {
                        id: "Martes"
                    },
                    {
                        id: "martes"
                    },
                    {
                        id: "MARTES"
                    }
                ],
                wednesday: [
                    {
                        id: "Miércoles"
                    },
                    {
                        id: "miércoles"
                    },
                    {
                        id: "MIÉRCOLES"
                    },
                    {
                        id: "Miércoles"
                    },
                    {
                        id: "miércoles"
                    },
                    {
                        id: "MIÉRCOLES"
                    }
                ],
                thursday: [
                    {
                        id: "Jueves"
                    },
                    {
                        id: "jueves"
                    },
                    {
                        id: "JUEVES"
                    }
                ],
                friday: [
                    {
                        id: "Viernes"
                    },
                    {
                        id: "viernes"
                    },
                    {
                        id: "VIERNES"
                    }
                ],
                saturday: [
                    {
                        id: "Sábado"
                    },
                    {
                        id: "sábado"
                    },
                    {
                        id: "SÁBADO"
                    },
                    {
                        id: "Sabado"
                    },
                    {
                        id: "sabado"
                    },
                    {
                        id: "SABADO"
                    }
                ],
                sunday: [
                    {
                        id: "Domingo"
                    },
                    {
                        id: "domingo"
                    },
                    {
                        id: "DOMINGO"
                    }
                ]
            }
        },
        manualAdd: {
            name: {
                value: null,
                valid: true,
                text: ""
            },
            map: {
                main: null,
                geocoder: null,
                marker: {
                    main: null,
                    window: null,
                    position: {
                        lat: null,
                        lng: null
                    },
                },
                data: {
                    address: "Ciudad de México, México",
                    zoom: 13
                }
            },
            sameConf: false,
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
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
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
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
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
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
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
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
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
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
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
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
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
                this.models.sucursal = e.sucursal;
                this.models.sucursalHorario = e.sucursalHorario;
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
            var me = this;
            if(this.typeSelection.type === 1){
                if(this.manualAdd.map.marker.main){
                    this.manualAdd.map.main = new google.maps.Map(document.getElementById('mapAddStore'), {     //Define Map
                        zoom: this.manualAdd.map.data.zoom,
                        center: this.manualAdd.map.marker.position
                    });
                    this.initPosition();
                }
                else{
                    this.manualAdd.map.main = new google.maps.Map(document.getElementById('mapAddStore'), {     //Define Map
                        zoom: this.manualAdd.map.data.zoom
                    });
                    this.initGeocoder();
                }
                this.manualAdd.map.main.addListener("click", function(e){       //Define on click listener for map
                    me.positioner(e.latLng);
                });
                this.initSearch();
                this.initFocus();
            }
            else{
                this.importer.map.main = new google.maps.Map(document.getElementById('mapAddImportStore'), {     //Define Map
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
                this.manualAdd.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionAddStore'));
            else
                this.importer.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionAddImportStore'));
        },
        initSearch: function(){
            var me = this, input, searchBox;
            if(this.typeSelection.type === 1){
                input = document.getElementById('searchAddStore');
                searchBox = new google.maps.places.SearchBox(input);
                this.manualAdd.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        
                // Bias the SearchBox results towards current map's viewport.
                this.manualAdd.map.main.addListener('bounds_changed', function() {
                  searchBox.setBounds(me.manualAdd.map.main.getBounds());
                });
            }
            //else{
            //    input = document.getElementById('searchAddImportStore');
            //    searchBox = new google.maps.places.SearchBox(input);
            //    this.importer.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            //
            //    // Bias the SearchBox results towards current map's viewport.
            //    this.importer.map.main.addListener('bounds_changed', function() {
            //      searchBox.setBounds(me.importer.map.main.getBounds());
            //    });
            //}
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();
                if(places.length === 0){
                    return;
                }
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    if(!place.geometry){
                      console.log("Returned place contains no geometry");
                      return;
                    }
                    //var icon = {
                    //  url: place.icon,
                    //  size: new google.maps.Size(71, 71),
                    //  origin: new google.maps.Point(0, 0),
                    //  anchor: new google.maps.Point(17, 34),
                    //  scaledSize: new google.maps.Size(25, 25)
                    //};
                    //
                    //// Create a marker for each place.
                    //markers.push(new google.maps.Marker({
                    //  map: map,
                    //  icon: icon,
                    //  title: place.name,
                    //  position: place.geometry.location
                    //}));
        
                    if(place.geometry.viewport){
                      // Only geocodes have viewport.
                      bounds.union(place.geometry.viewport);
                    }
                    else{
                      bounds.extend(place.geometry.location);
                    }
                  });
                if(me.typeSelection.type === 1)
                    me.manualAdd.map.main.fitBounds(bounds);
                //else
                //    me.importer.map.main.fitBounds(bounds);
            });
        },
        initPosition: function(){
            if(this.manualAdd.map.marker.position.lat !== null &&
               this.manualAdd.map.marker.position.lng !== null)
                this.manualAdd.map.marker.main = new google.maps.Marker({
                    map: this.manualAdd.map.main,
                    position: this.manualAdd.map.marker.position,
                    icon: "/image/maps/blue.png"
                });
        },
        initGeocoder: function(){
            var me = this;
            if(this.typeSelection.type === 1){
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
            }
            else
                this.importer.map.geocoder = new google.maps.Geocoder();      //Geocoder for fisrt position
        },
        focusPosition: function(){
            if(this.typeSelection.type === 1){
                if(this.manualAdd.map.marker.position.lat !== null &&
                   this.manualAdd.map.marker.position.lng !== null){
                    this.manualAdd.map.main.setCenter({
                        lat: this.manualAdd.map.marker.position.lat,
                        lng: this.manualAdd.map.marker.position.lng
                    });
                    this.manualAdd.map.main.setZoom(this.manualAdd.map.data.zoom);
                }
            }
            else{
                if(this.importer.store[this.importer.editIndex].marker.position.lat !== null &&
                   this.importer.store[this.importer.editIndex].marker.position.lng !== null){
                    this.importer.map.main.setCenter({
                        lat: this.importer.store[this.importer.editIndex].marker.position.lat,
                        lng: this.importer.store[this.importer.editIndex].marker.position.lng
                    });
                    this.importer.map.main.setZoom(this.importer.map.data.zoom);
                }
            }
        },
        positioner: function(pos, i){
            var me = this;
            if(this.typeSelection.type === 1){
                if(this.manualAdd.map.marker.main)
                    this.manualAdd.map.marker.main.setPosition(pos);
                else{
                    this.manualAdd.map.marker.main = new google.maps.Marker({
                        map: this.manualAdd.map.main,
                        position: pos,
                        icon: "/image/maps/blue.png"
                    });
                    this.manualAdd.map.marker.main.addListener("rightclick", function(){
                        me.manualAdd.map.marker.window.open(me.manualAdd.map.main, me.manualAdd.map.marker.main);
                    });
                    this.manualAdd.map.marker.window = new google.maps.InfoWindow({
                        content: "Dirección no encontrada.",
                        maxWidth: 175
                    });
                }
                this.manualAdd.map.geocoder.geocode({                          //Geocoder for placing
                    location: pos
                },
                function(response, status){
                    if(status === "OK" && response[0])
                        me.manualAdd.map.marker.window.setContent(response[0].formatted_address);
                    else
                        console.log(status, response);
                });
                this.manualAdd.map.marker.position.lat = pos.lat();
                this.manualAdd.map.marker.position.lng = pos.lng();
            }
            else{
                if(pos.lat !== null && pos.lng !== null){
                    if(this.importer.map.marker.main && !this.importer.first){
                        if(this.importer.map.marker.main.getMap() === null)
                            this.importer.map.marker.main.setMap(this.importer.map.main);
                        this.importer.map.marker.main.setPosition(pos);
                    }
                    else{
                        this.importer.map.marker.main = new google.maps.Marker({
                            map: this.importer.map.main,
                            position: pos,
                            icon: "/image/maps/blue.png"
                        });
                        this.importer.map.marker.main.addListener("rightclick", function(){
                            me.importer.map.marker.window.open(me.importer.map.main, me.importer.map.marker.main);
                        });
                        this.importer.map.marker.window = new google.maps.InfoWindow({
                            content: "Dirección no encontrada.",
                            maxWidth: 175
                        });
                    }
                    this.importer.map.geocoder.geocode({                          //Geocoder for placing
                        location: pos
                    },
                    function(response, status){
                        if(status === "OK" && response[0])
                            me.importer.map.marker.window.setContent(response[0].formatted_address);
                        else
                            console.log(status, response);
                    });
                    if(i)
                        this.importer.map.main.setCenter(pos);
                    else{
                        this.importer.store[this.importer.editIndex].marker.position.lat = pos.lat();
                        this.importer.store[this.importer.editIndex].marker.position.lng = pos.lng();
                    }
                }
                else{
                    if(this.importer.map.marker.main !== null)
                        this.importer.map.marker.main.setMap(null);
                    this.importer.map.geocoder.geocode({                          //Geocoder for placing
                        address: this.importer.map.data.address
                    },
                    function(response, status){
                        if(status === "OK")
                            me.importer.map.main.setCenter(response[0].geometry.location);
                        else
                            console.log(status);
                    });
                }
            }
        },
        changeStep: function(e){
            if(this.typeSelection.type === 1){
                this.manualAdd.actualStep = e;
                this.manualAdd.steps[e].seen = true;
            }
            else
                this.importer.store[this.importer.editIndex].actualStep = e;
        },
        setInterval: function(){
            var i,
                newSchedule = [],
                interval,
                length,
                step;
            if(this.typeSelection.type === 1){
                step = this.manualAdd.sameConf ? 0 : this.manualAdd.actualStep;
                interval = Math.floor(parseInt(this.manualAdd.steps[step].interval)) <= this.manualAdd.maxInterval ? Math.floor(parseInt(this.manualAdd.steps[step].interval)) : this.manualAdd.maxInterval;
                length = this.manualAdd.steps[step].schedule.length;
                if(!isNaN(Math.floor(parseInt(this.manualAdd.steps[step].interval)))){
                    this.manualAdd.steps[step].interval = interval;
                    if(length < interval){
                        for(i = 0; i < interval - length; i++)
                            this.manualAdd.steps[step].schedule.push({
                                begin: "",
                                end: "",
                                validBegin: true,
                                validEnd: true,
                                textBegin: "hh:mm:ss",
                                textEnd: "hh:mm:ss",
                                id: null
                            });
                    }
                    else if(length > interval){
                        for(i = 0; i < interval; i++)
                            newSchedule.push(this.manualAdd.steps[step].schedule[i]);
                        this.manualAdd.steps[step].schedule = newSchedule;
                    }
                }
            }
            else{
                step = this.importer.store[this.importer.editIndex].actualStep;
                interval = Math.floor(parseInt(this.importer.store[this.importer.editIndex].steps[step].interval)) <= this.manualAdd.maxInterval ? Math.floor(parseInt(this.importer.store[this.importer.editIndex].steps[step].interval)) : this.manualAdd.maxInterval;
                length = this.importer.store[this.importer.editIndex].steps[step].schedule.length;
                if(!isNaN(Math.floor(parseInt(this.importer.store[this.importer.editIndex].steps[step].interval)))){
                    this.importer.store[this.importer.editIndex].steps[step].interval = interval;
                    if(length < interval){
                        for(i = 0; i < interval - length; i++)
                            this.importer.store[this.importer.editIndex].steps[step].schedule.push({
                                begin: "",
                                end: "",
                                validBegin: true,
                                validEnd: true,
                                textBegin: "hh:mm:ss",
                                textEnd: "hh:mm:ss"
                            });
                    }
                    else if(length > interval){
                        for(i = 0; i < interval; i++)
                            newSchedule.push(this.importer.store[this.importer.editIndex].steps[step].schedule[i]);
                        this.importer.store[this.importer.editIndex].steps[step].schedule = newSchedule;
                    }
                }
            }
        },
        validation: function(type, i, j, k){
            switch(type){
                case "name":
                    this.manualAdd.name.valid = false;
                    if(this.manualAdd.name.value === null ||
                       this.manualAdd.name.value === "")
                        this.manualAdd.name.text = "Nombre no puede estar vacío";
                    else if(this.manualAdd.name.value.length < 6)
                        this.manualAdd.name.text = "Nombre debe contener al menos 6 caracteres";
                    else{
                        this.manualAdd.name.valid = true;
                        this.manualAdd.name.text = "";
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
                case "import-name":
                    this.importer.store[i].name.valid = false;
                    if(this.importer.store[i].name.value === undefined ||
                       this.importer.store[i].name.value === null ||
                       this.importer.store[i].name.value === "")
                        this.importer.store[i].name.text = "Nombre no puede estar vacío";
                    else if(this.importer.store[i].name.value.length < 6)
                        this.importer.store[i].name.text = "Nombre debe contener al menos 6 caracteres";
                    else{
                        this.importer.store[i].name.valid = true;
                        this.importer.store[i].name.text = "";
                    }
                    break;
                case "import-time-begin":
                    this.importer.store[i].steps[j].schedule[k].validBegin = false;
                    if(this.importer.store[i].steps[j].schedule[k].begin === undefined ||
                       this.importer.store[i].steps[j].schedule[k].begin === "")
                        this.importer.store[i].steps[j].schedule[k].textBegin = "El inicio del intervalo no puede estar vacío";
                    else if(this.importer.store[i].steps[j].schedule[k].begin.length !== 8)
                        this.importer.store[i].steps[j].schedule[k].textBegin = "El inicio del intervalo no tiene un formato apropiado";
                    else{
                        this.importer.store[i].steps[j].schedule[k].textBegin = "hh:mm:ss";
                        this.importer.store[i].steps[j].schedule[k].validBegin = true;
                    }
                    break;
                case "import-time-end":
                    this.importer.store[i].steps[j].schedule[k].validEnd = false;
                    if(this.importer.store[i].steps[j].schedule[k].end === undefined ||
                       this.importer.store[i].steps[j].schedule[k].end === "")
                        this.importer.store[i].steps[j].schedule[k].textEnd = "El final del intervalo no puede estar vacío";
                    else if(this.importer.store[i].steps[j].schedule[k].end.length !== 8)
                        this.importer.store[i].steps[j].schedule[k].textEnd = "El final del intervalo no tiene un formato apropiado";
                    else{
                        this.importer.store[i].steps[j].schedule[k].textEnd = "hh:mm:ss";
                        this.importer.store[i].steps[j].schedule[k].validEnd = true;
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
                i, j = null, length, workbook, data, delimiterType, value, headers,
                reader = new FileReader();
            this.importer.store = [];
            this.importer.editIndex = null;
            this.importer.variant.nameId = null;
            this.importer.variant.addressId = null;
            this.importer.variant.mondayId = null;
            this.importer.variant.tuesdayId = null;
            this.importer.variant.wednesdayId = null;
            this.importer.variant.thursdayId = null;
            this.importer.variant.fridayId = null;
            this.importer.variant.saturdayId = null;
            this.importer.variant.sundayId = null;
            BUTO.components.main.loader.active = true;
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
                    for(i = 0; i < me.importer.variant.address.length; i++)
                        if(headers.indexOf(me.importer.variant.address[i].id) !== -1)
                            me.importer.variant.addressId = me.importer.variant.address[i].id;
                    for(i = 0; i < me.importer.variant.monday.length; i++)
                        if(headers.indexOf(me.importer.variant.monday[i].id) !== -1)
                            me.importer.variant.mondayId = me.importer.variant.monday[i].id;
                    for(i = 0; i < me.importer.variant.tuesday.length; i++)
                        if(headers.indexOf(me.importer.variant.tuesday[i].id) !== -1)
                            me.importer.variant.tuesdayId = me.importer.variant.tuesday[i].id;
                    for(i = 0; i < me.importer.variant.wednesday.length; i++)
                        if(headers.indexOf(me.importer.variant.wednesday[i].id) !== -1)
                            me.importer.variant.wednesdayId = me.importer.variant.wednesday[i].id;
                    for(i = 0; i < me.importer.variant.thursday.length; i++)
                        if(headers.indexOf(me.importer.variant.thursday[i].id) !== -1)
                            me.importer.variant.thursdayId = me.importer.variant.thursday[i].id;
                    for(i = 0; i < me.importer.variant.friday.length; i++)
                        if(headers.indexOf(me.importer.variant.friday[i].id) !== -1)
                            me.importer.variant.fridayId = me.importer.variant.friday[i].id;
                    for(i = 0; i < me.importer.variant.saturday.length; i++)
                        if(headers.indexOf(me.importer.variant.saturday[i].id) !== -1)
                            me.importer.variant.saturdayId = me.importer.variant.saturday[i].id;
                    for(i = 0; i < me.importer.variant.sunday.length; i++)
                        if(headers.indexOf(me.importer.variant.sunday[i].id) !== -1)
                            me.importer.variant.sundayId = me.importer.variant.sunday[i].id;
                    if(me.importer.variant.nameId !== null &&
                       me.importer.variant.addressId !== null){
                        me.initGeocoder();
                        for(i = 0; i < length; i++){
                            if(data[i][me.importer.variant.nameId] !== undefined){
                                j = me.importer.store.length;
                                me.importer.store.push({
                                    name: {
                                        value: data[i][me.importer.variant.nameId],
                                        valid: false,
                                        text: ""
                                    },
                                    marker: {
                                        position: {
                                            lat: null,
                                            lng: null
                                        },
                                        data: {
                                            address: data[i][me.importer.variant.addressId],
                                            zoom: 13
                                        }
                                    },
                                    valid: true,
                                    actualStep: 0,
                                    steps: [
                                        {
                                            text: "Lunes",
                                            dayNumber: 2,
                                            active: false,
                                            schedule: [],
                                            interval: 0,
                                            seen: true
                                        },
                                        {
                                            text: "Martes",
                                            dayNumber: 3,
                                            active: false,
                                            schedule: [],
                                            interval: 0,
                                            seen: true
                                        },
                                        {
                                            text: "Miércoles",
                                            dayNumber: 4,
                                            active: false,
                                            schedule: [],
                                            interval: 0,
                                            seen: true
                                        },
                                        {
                                            text: "Jueves",
                                            dayNumber: 5,
                                            active: false,
                                            schedule: [],
                                            interval: 0,
                                            seen: true
                                        },
                                        {
                                            text: "Viernes",
                                            dayNumber: 6,
                                            active: false,
                                            schedule: [],
                                            interval: 0,
                                            seen: true
                                        },
                                        {
                                            text: "Sábado",
                                            dayNumber: 7,
                                            active: false,
                                            schedule: [],
                                            interval: 0,
                                            seen: true
                                        },
                                        {
                                            text: "Domingo",
                                            dayNumber: 1,
                                            active: false,
                                            schedule: [],
                                            interval: 0,
                                            seen: true
                                        },
                                    ]
                                });
                                me.getLocation(j);
                                me.validation("import-name", j);
                            }
                            if(j !== null){
                                if(data[i][me.importer.variant.mondayId] !== undefined &&
                                   me.importer.store[j].steps[0].schedule.length <= me.manualAdd.maxInterval){
                                    value = typeof data[i][me.importer.variant.mondayId] !== "string" ? data[i][me.importer.variant.mondayId].toString() : data[i][me.importer.variant.mondayId];
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.store[j].steps[0].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss"
                                    });
                                    me.importer.store[j].steps[0].interval = me.importer.store[j].steps[0].schedule.length;
                                    if(!me.importer.store[j].steps[0].active)
                                        me.importer.store[j].steps[0].active = true;
                                    me.validation("import-time-begin", j, 0, me.importer.store[j].steps[0].interval - 1);
                                    me.validation("import-time-end", j, 0, me.importer.store[j].steps[0].interval - 1);
                                }
                                if(data[i][me.importer.variant.tuesdayId] !== undefined &&
                                   me.importer.store[j].steps[1].schedule.length <= me.manualAdd.maxInterval){
                                    value = typeof data[i][me.importer.variant.tuesdayId] !== "string" ? data[i][me.importer.variant.tuesdayId].toString() : data[i][me.importer.variant.tuesdayId];
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.store[j].steps[1].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss"
                                    });
                                    me.importer.store[j].steps[1].interval = me.importer.store[j].steps[1].schedule.length;
                                    if(!me.importer.store[j].steps[1].active)
                                        me.importer.store[j].steps[1].active = true;
                                    me.validation("import-time-begin", j, 1, me.importer.store[j].steps[1].interval - 1);
                                    me.validation("import-time-end", j, 1, me.importer.store[j].steps[1].interval - 1);
                                }
                                if(data[i][me.importer.variant.wednesdayId] !== undefined &&
                                   me.importer.store[j].steps[2].schedule.length <= me.manualAdd.maxInterval){
                                    value = typeof data[i][me.importer.variant.wednesdayId] !== "string" ? data[i][me.importer.variant.wednesdayId].toString() : data[i][me.importer.variant.wednesdayId];
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.store[j].steps[2].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss"
                                    });
                                    me.importer.store[j].steps[2].interval = me.importer.store[j].steps[2].schedule.length;
                                    if(!me.importer.store[j].steps[2].active)
                                        me.importer.store[j].steps[2].active = true;
                                    me.validation("import-time-begin", j, 2, me.importer.store[j].steps[2].interval - 1);
                                    me.validation("import-time-end", j, 2, me.importer.store[j].steps[2].interval - 1);
                                }
                                if(data[i][me.importer.variant.thursdayId] !== undefined &&
                                   me.importer.store[j].steps[3].schedule.length <= me.manualAdd.maxInterval){
                                    value = typeof data[i][me.importer.variant.thursdayId] !== "string" ? data[i][me.importer.variant.thursdayId].toString() : data[i][me.importer.variant.thursdayId];
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.store[j].steps[3].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss"
                                    });
                                    me.importer.store[j].steps[3].interval = me.importer.store[j].steps[3].schedule.length;
                                    if(!me.importer.store[j].steps[3].active)
                                        me.importer.store[j].steps[3].active = true;
                                    me.validation("import-time-begin", j, 3, me.importer.store[j].steps[3].interval - 1);
                                    me.validation("import-time-end", j, 3, me.importer.store[j].steps[3].interval - 1);
                                }
                                if(data[i][me.importer.variant.fridayId] !== undefined &&
                                   me.importer.store[j].steps[4].schedule.length <= me.manualAdd.maxInterval){
                                    value = typeof data[i][me.importer.variant.fridayId] !== "string" ? data[i][me.importer.variant.fridayId].toString() : data[i][me.importer.variant.fridayId];
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.store[j].steps[4].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss"
                                    });
                                    me.importer.store[j].steps[4].interval = me.importer.store[j].steps[4].schedule.length;
                                    if(!me.importer.store[j].steps[4].active)
                                        me.importer.store[j].steps[4].active = true;
                                    me.validation("import-time-begin", j, 4, me.importer.store[j].steps[4].interval - 1);
                                    me.validation("import-time-end", j, 4, me.importer.store[j].steps[4].interval - 1);
                                }
                                if(data[i][me.importer.variant.saturdayId] !== undefined &&
                                   me.importer.store[j].steps[5].schedule.length <= me.manualAdd.maxInterval){
                                    value = typeof data[i][me.importer.variant.saturdayId] !== "string" ? data[i][me.importer.variant.saturdayId].toString() : data[i][me.importer.variant.saturdayId];
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.store[j].steps[5].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss"
                                    });
                                    me.importer.store[j].steps[5].interval = me.importer.store[j].steps[5].schedule.length;
                                    if(!me.importer.store[j].steps[5].active)
                                        me.importer.store[j].steps[5].active = true;
                                    me.validation("import-time-begin", j, 5, me.importer.store[j].steps[5].interval - 1);
                                    me.validation("import-time-end", j, 5, me.importer.store[j].steps[5].interval - 1);
                                }
                                if(data[i][me.importer.variant.sundayId] !== undefined &&
                                   me.importer.store[j].steps[6].schedule.length <= me.manualAdd.maxInterval){
                                    value = typeof data[i][me.importer.variant.sundayId] !== "string" ? data[i][me.importer.variant.sundayId].toString() : data[i][me.importer.variant.sundayId];
                                    delimiterType = value.indexOf(" - ") !== -1 ? " - " : " – ";
                                    me.importer.store[j].steps[6].schedule.push({
                                        begin: value.split(delimiterType)[0] !== undefined ? value.split(delimiterType)[0] : "",
                                        end: value.split(delimiterType)[1] !== undefined ? value.split(delimiterType)[1] : "",
                                        validBegin: false,
                                        validEnd: false,
                                        textBegin: "hh:mm:ss",
                                        textEnd: "hh:mm:ss"
                                    });
                                    me.importer.store[j].steps[6].interval = me.importer.store[j].steps[6].schedule.length;
                                    if(!me.importer.store[j].steps[6].active)
                                        me.importer.store[j].steps[6].active = true;
                                    me.validation("import-time-begin", j, 6, me.importer.store[j].steps[6].interval - 1);
                                    me.validation("import-time-end", j, 6, me.importer.store[j].steps[6].interval - 1);
                                }
                            }
                        }
                    }
                    else{
                        BUTO.components.main.alert.description.text = "No se pudo identificar una columna apropiada para obtener: ";
                        if(me.importer.variant.nameId === null)
                            BUTO.components.main.alert.description.text += "<br> - Nombre";
                        if(me.importer.variant.addressId === null)
                            BUTO.components.main.alert.description.text += "<br> - Dirección";
                        BUTO.components.main.alert.description.title = "Errores en importación de datos";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    BUTO.components.main.loader.active = false;
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
            var me = this;
            this.importer.map.geocoder.geocode({                          //Geocoder for placing
                address: this.importer.store[i].marker.data.address
            },
            function(response, status){
                if(status === "OK"){
                    me.importer.store[i].marker.position.lat = response[0].geometry.location.lat();
                    me.importer.store[i].marker.position.lng = response[0].geometry.location.lng();
                }
                else
                    console.log(status);
            });
        },
        remove: function(i){
            var j, newStore = [], length = this.importer.store.length;
            this.importer.editIndex = null;
            for(j = 0; j < length; j++)
                if(j !== i)
                    newStore.push(this.importer.store[j]);
            this.importer.store = newStore;
        },
        edit: function(i){
            var me = this;
            this.importer.editIndex = i;
            if(this.importer.first){
                Vue.nextTick(function(){
                    setTimeout(function(){
                        me.initMap();
                        me.positioner(me.importer.store[i].marker.position, true);
                        me.importer.first = false;
                    }, 250);
                });
            }
            else
                this.positioner(this.importer.store[i].marker.position, true);
        },
        submit: function(e){
            var me = this,
                i, j, k = 0, limit = 4, length,
                first = true,
                hmdB, hmdE,
                error = "", total = 0,
                valid = true;
            switch(e){
                case "manual":
                    if(this.manualAdd.name.value === null || this.manualAdd.name.value === ""){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Nombre no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.name.valid = false;
                        this.manualAdd.name.text = "Nombre no puede estar vacío";
                    }
                    else if(valid && (this.manualAdd.name.value.length < 6)){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Nombre debe contener al menos 6 caracteres.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.manualAdd.name.valid = false;
                        this.manualAdd.name.text = "Nombre debe contener al menos 6 caracteres";
                    }
                    else if(this.manualAdd.map.marker.main === null ||                  //No position
                            this.manualAdd.map.marker.position.lat === null || this.manualAdd.map.marker.position.lng === null){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Debes escoger una ubicación.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    else{
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
                        if(valid){
                            this.models.sucursal.post({
                                params: {
                                    nombre: this.manualAdd.name.value,
                                    lat: this.manualAdd.map.marker.position.lat,
                                    lng: this.manualAdd.map.marker.position.lng
                                }
                            },
                            function(success){
                                for(i = 0; i < me.manualAdd.steps.length; i++)
                                    if(me.manualAdd.steps[i].active || me.manualAdd.sameConf){
                                        for(j = 0; j < me.manualAdd.steps[me.manualAdd.sameConf ? 0 : i].schedule.length; j++){
                                            me.submitSchedule(i, j, null, success.body.id, first, null);
                                            first = false;
                                        }
                                    }
                                    else
                                        me.reset("schedule", i, null);
                                BUTO.components.main.children.tiendasRegistradas.grid.updatePagination();
                                BUTO.components.main.alert.description.title = "Registro de Tienda";
                                BUTO.components.main.alert.description.text = "Se ha registrado correctamente la tienda '" + success.body.nombre + "'";
                                BUTO.components.main.alert.description.ok = "Aceptar";
                                BUTO.components.main.alert.active = true;
                            },
                            function(error){
                                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                                BUTO.components.main.alert.description.text = error.body[0].message;
                                BUTO.components.main.alert.description.ok = "Aceptar";
                                BUTO.components.main.alert.active = true;
                                
                                me.manualAdd.name.valid = false;
                                me.manualAdd.name.text = error.body[0].message;
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
                    BUTO.components.main.loader.active = true;
                    this.importer.valid = true;
                    length = [this.importer.store.length];
                    for(i = 0; i < length[0]; i++){
                        this.importer.store[i].valid = true;
                        total += i;
                    }
                    for(i = 0; i < length[0]; i++){
                        valid = true;
                        length[1] = this.importer.store[i].steps.length;
                        if(this.importer.store[i].name.value === null || this.importer.store[i].name.value === ""){     //No name
                            this.importer.store[i].name.valid = false;
                            this.importer.store[i].name.text = "Nombre no puede estar vacío";
                            valid = false;
                        }
                        else if(this.importer.store[i].name.value.length < 6){
                            this.importer.store[i].name.valid = false;
                            this.importer.store[i].name.text = "Nombre debe contener al menos 6 caracteres";
                            valid = false;
                        }
                        if(this.importer.store[i].marker.position.lat === null || this.importer.store[i].marker.position.lng === null){
                            if(valid){
                                this.importer.store[i].name.text = "Debes escoger una ubicación";
                                valid = false;
                            }
                        }
                        for(j = 0; j < length[1]; j++)
                            if(this.importer.store[i].steps[j].active){
                                length[2] = this.importer.store[i].steps[j].schedule.length;
                                for(k = 0; k < length[2]; k++){
                                    hmdB = this.importer.store[i].steps[j].schedule[k].begin.split(":");
                                    hmdE = this.importer.store[i].steps[j].schedule[k].end.split(":");
                                    this.importer.store[i].steps[j].schedule[k].validBegin = true;
                                    this.importer.store[i].steps[j].schedule[k].validEnd = true;
                                    this.importer.store[i].steps[j].schedule[k].textBegin = "hh:mm:ss";
                                    this.importer.store[i].steps[j].schedule[k].textEnd = "hh:mm:ss";
                                    if(this.importer.store[i].steps[j].schedule[k].begin === ""){
                                        this.importer.store[i].steps[j].schedule[k].validBegin = false;
                                        this.importer.store[i].steps[j].schedule[k].textBegin = "El inicio del intervalo no puede estar vacío";
                                        if(valid){
                                            this.importer.store[i].name.text = "Errores en horarios del día " + this.importer.store[i].steps[j].text;
                                            valid = false;
                                        }
                                    }
                                    if(this.importer.store[i].steps[j].schedule[k].end === ""){
                                        this.importer.store[i].steps[j].schedule[k].validEnd = false;
                                        this.importer.store[i].steps[j].schedule[k].textEnd = "El final del intervalo no puede estar vacío";
                                        if(valid){
                                            this.importer.store[i].name.text = "Errores en horarios del día " + this.importer.store[i].steps[j].text;
                                            valid = false;
                                        }
                                    }
                                    if(this.importer.store[i].steps[j].schedule[k].begin !== "" &&
                                       (this.importer.store[i].steps[j].schedule[k].begin > "23:59:59" ||
                                        hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59)){
                                        this.importer.store[i].steps[j].schedule[k].validBegin = false;
                                        this.importer.store[i].steps[j].schedule[k].textBegin = "El inicio del intervalo no tiene un formato apropiado";
                                        if(valid){
                                            this.importer.store[i].name.text = "Errores en horarios del día " + this.importer.store[i].steps[j].text;
                                            valid = false;
                                        }
                                    }
                                    if(this.importer.store[i].steps[j].schedule[k].end !== "" &&
                                       (this.importer.store[i].steps[j].schedule[k].end > "23:59:59" ||
                                        hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59)){
                                        this.importer.store[i].steps[j].schedule[k].validEnd = false;
                                        this.importer.store[i].steps[j].schedule[k].textEnd = "El final del intervalo no tiene un formato apropiado";
                                        if(valid){
                                            this.importer.store[i].name.text = "Errores en horarios del día " + this.importer.store[i].steps[j].text;
                                            valid = false;
                                        }
                                    }
                                    if(this.importer.store[i].steps[j].schedule[k].begin !== "" &&
                                       this.importer.store[i].steps[j].schedule[k].end !== "" &&
                                       this.importer.store[i].steps[j].schedule[k].begin >= this.importer.store[i].steps[j].schedule[k].end){
                                        this.importer.store[i].steps[j].schedule[k].validBegin = false;
                                        this.importer.store[i].steps[j].schedule[k].validEnd = false;
                                        this.importer.store[i].steps[j].schedule[k].textBegin = "El inicio del intervalo debe ser menor al final del mismo";
                                        this.importer.store[i].steps[j].schedule[k].textEnd = "El final del intervalo debe ser mayor al inicio del mismo";
                                        if(valid){
                                            this.importer.store[i].name.text = "Errores en horarios del día " + this.importer.store[i].steps[j].text;
                                            valid = false;
                                        }
                                    }
                                    if(k > 0 &&
                                       this.importer.store[i].steps[j].schedule[k].begin !== "" &&
                                       this.importer.store[i].steps[j].schedule[k - 1].end !== "" &&
                                       this.importer.store[i].steps[j].schedule[k].begin <= this.importer.store[i].steps[j].schedule[k - 1].end){
                                        this.importer.store[i].steps[j].schedule[k].validBegin = false;
                                        this.importer.store[i].steps[j].schedule[k - 1].validEnd = false;
                                        this.importer.store[i].steps[j].schedule[k].textBegin = "El inicio del intervalo debe ser mayor al final del intervalo anterior";
                                        this.importer.store[i].steps[j].schedule[k - 1].textEnd = "El final del intervalo debe ser menor al inicio del intervalo posterior";
                                        if(valid){
                                            this.importer.store[i].name.text = "Errores en horarios del día " + this.importer.store[i].steps[j].text;
                                            valid = false;
                                        }
                                    }
                                }
                            }
                        this.importer.valid *= valid;
                        this.importer.store[i].valid = valid;
                        this.submitStore(i, total);
                    }
                    break;
            }
        },
        submitStore: function(i, total){
            var me = this,
                j, k;
            if(this.importer.store[i].valid){
                this.models.sucursal.post({
                    params: {
                        nombre: this.importer.store[i].name.value,
                        lat: this.importer.store[i].marker.position.lat,
                        lng: this.importer.store[i].marker.position.lng
                    }
                },
                function(success){
                    me.importer.total += i;
                    for(j = 0; j < me.importer.store[i].steps.length; j++){
                        if(me.importer.store[i].steps[j].schedule.length > 0)
                            for(k = 0; k < me.importer.store[i].steps[j].schedule.length; k++)
                                me.submitSchedule(i, j, k, success.body.id, null, total);
                        else
                            me.submitSchedule(i, j, -1, success.body.id, null, total);
                    }
                    if(me.importer.total === total){
                        BUTO.components.main.children.tiendasRegistradas.grid.updatePagination();
                        if(me.importer.valid){
                            BUTO.components.main.alert.description.title = "Importación de datos completada";
                            BUTO.components.main.alert.description.text = "Los registros ya han sido agregados.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                        }
                        else{
                            BUTO.components.main.alert.description.title = "Errores en importación de datos";
                            BUTO.components.main.alert.description.text = "Existen algunos errores en los datos obtenidos. Inténtalo de nuevo.<br>NOTA: Los registros correctamente definidos ya han sido agregados.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                        }
                    }
                },
                function(error){
                    me.importer.total += i;
                    me.importer.valid = false;
                    me.importer.store[i].valid = false;
                    if(me.importer.total === total){
                        BUTO.components.main.children.tiendasRegistradas.grid.updatePagination();
                        BUTO.components.main.alert.description.title = "Errores en importación de datos";
                        BUTO.components.main.alert.description.text = "Existen algunos errores en los datos obtenidos. Inténtalo de nuevo.<br>NOTA: Los registros correctamente definidos ya han sido agregados.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        setTimeout(function(){
                            me.reset("import");
                        }, 250);
                    }
                    me.importer.store[i].name.valid = false;
                    me.importer.store[i].name.text = error.body[0].message;
                }); 
            }
            else{
                this.importer.total += i;
                for(j = 0; j < this.importer.store[i].steps.length; j++)
                    for(k = 0; k < this.importer.store[i].steps[j].schedule.length; k++){
                        this.submitSchedule(i, j, k, null, null, total);
                    }
                if(this.importer.total === total){
                    BUTO.components.main.children.tiendasRegistradas.grid.updatePagination();
                    setTimeout(function(){
                        me.reset("import");
                    }, 250);
                }
            }
        },
        submitSchedule: function(i, j, k, id, first, total){
            var me = this;
            if(this.typeSelection.type === 1){
                if(first)
                    this.reset("store");
                this.models.sucursalHorario.post({
                    delimiters: id,
                    params: {
                        dia: this.manualAdd.steps[i].dayNumber,
                        hora_inicio: this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule[j].begin,
                        hora_fin: this.manualAdd.steps[this.manualAdd.sameConf ? 0 : i].schedule[j].end
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
                if(this.importer.store[i].valid &&
                   this.importer.store[i].steps[j].active)
                    this.models.sucursalHorario.post({
                        delimiters: id,
                        params: {
                            dia: this.importer.store[i].steps[j].dayNumber,
                            hora_inicio: this.importer.store[i].steps[j].schedule[k].begin,
                            hora_fin: this.importer.store[i].steps[j].schedule[k].end
                        }
                    },
                    function(success){
                        //if(me.importer.total === total &&
                        //   j === me.importer.store[i].steps.length - 1 &&
                        //   k === me.importer.store[i].steps[j].schedule.length - 1)
                        //    me.reset("import");
                    },
                    function(error){
                        console.log(error);
                    });
                if(this.importer.total === total &&
                    j === this.importer.store[i].steps.length - 1 &&
                    k === this.importer.store[i].steps[j].schedule.length - 1)
                    setTimeout(function(){
                        me.reset("import");
                    }, 250);
            }
        },
        reset: function(a, i, j){
            var length, newSteps = [];
            switch(a){
                case "import":
                    length = this.importer.store.length;
                    this.importer.editIndex = null;
                    for(i = 0; i < this.importer.store.length; i++)
                        if(!this.importer.store[i].valid)
                            newSteps.push(this.importer.store[i]);
                    this.importer.store = newSteps;
                    this.importer.total = 0;
                    this.importer.valid = true;
                    BUTO.components.main.loader.active = false;
                    break;
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
                    if((j !== null && j === this.manualAdd.steps[i].schedule.length - 1) || j === null){
                        this.manualAdd.steps[i].schedule = [];
                        this.manualAdd.steps[i].schedule.push({
                            begin: "",
                            end: "",
                            validBegin: true,
                            validEnd: true,
                            textBegin: "hh:mm:ss",
                            textEnd: "hh:mm:ss",
                            id: null
                        });
                    }
                    break;
                case "all":
                    if(this.typeSelection.type === 1){
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
                                textBegin: "hh:mm:ss",
                                textEnd: "hh:mm:ss",
                                id: null
                            });
                        }
                    }
                    else{
                        this.importer.editIndex = null;
                        this.importer.first = true;
                        this.importer.store = newSteps;
                        this.importer.total = 0;
                        this.importer.valid = true;
                    }
                    break;
            }
        }
    }
});