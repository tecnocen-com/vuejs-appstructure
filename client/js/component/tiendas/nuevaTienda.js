module.exports = new Vue({
    data: {
        models: {
            sucursal: null,
            sucursalHorario: null
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
            id: null,
            name: null,
            error: "",
            map: {
                main: null,
                geocoder: null,
                marker: {
                    main: null,
                    position: {
                        lat: null,
                        lng: null
                    },
                },
                data: {
                    address: "Chilpancingo_1_2, Hipódromo",
                    zoom: 18
                }
            },
            actualStep: 0,
            maxInterval: 5,
            steps: [
                {
                    text: "Lunes",
                    dayNumber: 2,
                    active: false,
                    schedule: [
                        {
                            begin: "",
                            end: "",
                            id: null
                        }
                    ],
                    interval: 1,
                    seen: true
                },
                {
                    text: "Martes",
                    dayNumber: 3,
                    active: false,
                    schedule: [
                        {
                            begin: "",
                            end: "",
                            id: null
                        }
                    ],
                    interval: 1,
                    seen: false
                },
                {
                    text: "Miércoles",
                    dayNumber: 4,
                    active: false,
                    schedule: [
                        {
                            begin: "",
                            end: "",
                            id: null
                        }
                    ],
                    interval: 1,
                    seen: false
                },
                {
                    text: "Jueves",
                    dayNumber: 5,
                    active: false,
                    schedule: [
                        {
                            begin: "",
                            end: "",
                            id: null
                        }
                    ],
                    interval: 1,
                    seen: false
                },
                {
                    text: "Viernes",
                    dayNumber: 6,
                    active: false,
                    schedule: [
                        {
                            begin: "",
                            end: "",
                            id: null
                        }
                    ],
                    interval: 1,
                    seen: false
                },
                {
                    text: "Sábado",
                    dayNumber: 7,
                    active: false,
                    schedule: [
                        {
                            begin: "",
                            end: "",
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
            if(this.typeSelection.type === 1)
                Vue.nextTick(function(){
                    me.initMap();
                });
        },
        initMap: function(){
            var me = this;
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
        },
        initSearch: function(){
            var me = this;
            var input = document.getElementById('searchAddStore');
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
                me.manualAdd.map.main.fitBounds(bounds);
            });
        },
        initPosition: function(){
            this.manualAdd.map.marker.main = new google.maps.Marker({
                map: this.manualAdd.map.main,
                position: this.manualAdd.map.marker.position
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
        mainSelect: function(e){
            var me = this;
            this.typeSelection.type = e;
            if(e === 1)
                Vue.nextTick(function(){
                    me.initMap();
                });
        },
        positioner: function(pos){
            if(this.manualAdd.map.marker.main)
                this.manualAdd.map.marker.main.setPosition(pos);
            else
                this.manualAdd.map.marker.main = new google.maps.Marker({
                    map: this.manualAdd.map.main,
                    position: pos
                });
            this.manualAdd.map.marker.position.lat = pos.lat();
            this.manualAdd.map.marker.position.lng = pos.lng();
        },
        changeStep: function(e){
            this.manualAdd.actualStep = e;
            this.manualAdd.steps[e].seen = true;
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
                        id: null
                    });
            }
            else if(length > interval){
                for(i = 0; i < interval; i++)
                    newSchedule.push(this.manualAdd.steps[this.manualAdd.actualStep].schedule[i]);
                this.manualAdd.steps[this.manualAdd.actualStep].schedule = newSchedule;
            }
        },
        submit: function(e){
            var me = this;
            switch(e){
                case "manual":
                    var i, j, k = 0, limit = 4,
                        hmdB, hmdE,
                        error = "",
                        valid = true;
                    if(this.manualAdd.name === null || this.manualAdd.name === ""){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Nombre no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    else if(this.manualAdd.map.marker.main === null ||                  //No position
                            this.manualAdd.map.marker.position.lat === null || this.manualAdd.map.marker.position.lng === null ||
                            this.manualAdd.map.marker.position.lat === "" || this.manualAdd.map.marker.position.lng === ""){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Debes escoger una ubicación.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    else{
                        for(i = 0; i < this.manualAdd.steps.length; i++)
                            if(this.manualAdd.steps[i].active)
                                for(j = 0; j < this.manualAdd.steps[i].schedule.length; j++){
                                    hmdB = this.manualAdd.steps[i].schedule[j].begin.split(":");
                                    hmdE = this.manualAdd.steps[i].schedule[j].end.split(":");
                                    if(this.manualAdd.steps[i].schedule[j].begin === ""){
                                        error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " no puede estar vacío.<br>" : "";
                                        valid = false; k++;
                                    }
                                    if(this.manualAdd.steps[i].schedule[j].end === ""){
                                        error += (k <= limit) ? "El final del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " no puede estar vacío.<br>" : "";
                                        valid = false; k++;
                                    }
                                    if(this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                       (this.manualAdd.steps[i].schedule[j].begin > "23:59:59" ||
                                        hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59)){
                                        error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " no tiene un formato apropiado.<br>" : "";
                                        valid = false; k++;
                                    }
                                    if(this.manualAdd.steps[i].schedule[j].end !== "" &&
                                       (this.manualAdd.steps[i].schedule[j].end > "23:59:59" ||
                                        hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59)){
                                        error += (k <= limit) ? "El final del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " no tiene un formato apropiado.<br>" : "";
                                        valid = false; k++;
                                    }
                                    if(this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                       this.manualAdd.steps[i].schedule[j].end !== "" &&
                                       this.manualAdd.steps[i].schedule[j].begin >= this.manualAdd.steps[i].schedule[j].end){
                                        error += (k <= limit) ? "El final del intervalo " + (j + 1) + " en el día " + this.manualAdd.steps[i].text + " debe ser mayor al inicio del mismo.<br>" : "";
                                        valid = false; k++;
                                    }
                                    if(j > 0 &&
                                       this.manualAdd.steps[i].schedule[j].begin !== "" &&
                                       this.manualAdd.steps[i].schedule[j - 1].end !== "" &&
                                       this.manualAdd.steps[i].schedule[j].begin <= this.manualAdd.steps[i].schedule[j - 1].end){
                                        error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " debe ser mayor al final del intervalo " + j + " en el día " + this.manualAdd.steps[i].text + ".<br>": "";
                                        valid = false; k++;
                                    }
                                }
                        if(valid){
                            this.models.sucursal.post({
                                params: {
                                    nombre: this.manualAdd.name,
                                    lat: this.manualAdd.map.marker.position.lat,
                                    lng: this.manualAdd.map.marker.position.lng
                                }
                            },
                            function(success){
                                me.manualAdd.id = success.body.id;
                                for(i = 0; i < me.manualAdd.steps.length; i++)
                                    if(me.manualAdd.steps[i].active)
                                        for(j = 0; j < me.manualAdd.steps[i].schedule.length; j++)
                                            me.submitSchedule(i, j, success.body.id);
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
        submitSchedule(i, j, id){
            var me = this;
            this.models.sucursalHorario.post({
                delimiters: id,
                params: {
                    dia: this.manualAdd.steps[i].dayNumber,
                    hora_inicio: this.manualAdd.steps[i].schedule[j].begin,
                    hora_fin: this.manualAdd.steps[i].schedule[j].end
                }
            },
            function(success){
                me.manualAdd.steps[i].schedule[j].id = success.body.id;
            },
            function(error){
                console.log(error);
            });
        }
    }
});