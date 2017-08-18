module.exports = new Vue({
    data: {
        id: null,
        name: {
            value: null,
            valid: true
        },
        models: {
            sucursal: null,
            sucursalHorario: null
        },
        map: {
            main: null,
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
                active: true,
                schedule: [
                    {
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        id: null,
                        remove: false
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
                        id: null,
                        remove: false
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
                        id: null,
                        remove: false
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
                        id: null,
                        remove: false
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
                        id: null,
                        remove: false
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
                        id: null,
                        remove: false
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
                        id: null,
                        remove: false
                    }
                ],
                interval: 1,
                seen: true
            },
        ]
    },
    methods: {
        init: function(){
            var me = this;
            this.models.sucursal.get({
                delimiters: this.id
            },
            function(success){
                me.name.value = success.body.nombre;
                me.map.marker.position.lat = success.body.lat;
                me.map.marker.position.lng = success.body.lng;
                me.initMap();
            },
            function(error){
                console.log(error);
            });
            for(var i = 0; i < me.steps.length; i++)
                me.steps[i].schedule = [];
            this.actualStep = 0;
            this.models.sucursalHorario.get({
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
                                id: success.body[i].id,
                                validBegin: true,
                                validEnd: true,
                                remove: false
                            });
                            break;
                        default:
                            me.steps[success.body[i].dia - 2].schedule.push({
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin,
                                id: success.body[i].id,
                                validBegin: true,
                                validEnd: true,
                                remove: false
                            });
                            break;
                    }
                }
                for(i = 0; i < me.steps.length; i++){
                    me.steps[i].active = (i === me.steps.length - 1) ? interval[0] === 0 ? false : true : interval[i + 1] === 0 ? false : true;
                    me.steps[i].interval = (i === me.steps.length - 1) ? interval[0] : interval[i + 1];
                }
            },
            function(error){
                console.log(error);
            });
        },
        initMap: function(){
            var me = this;
            this.map.main = new google.maps.Map(document.getElementById('mapEditStore'), {     //Define Map
                zoom: this.map.data.zoom,
                center: this.map.marker.position
            });
            this.map.main.addListener("click", function(e){       //Define on click listener for map
                me.positioner(e.latLng);
            });
            this.initPosition();
            this.initSearch();
            this.initFocus();
        },
        initFocus: function(){
            this.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionEditStore'));
        },
        initSearch: function(){
            var me = this;
            var input = document.getElementById('searchEditStore');
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
                me.map.main.fitBounds(bounds);
            });
        },
        initPosition: function(){
            if(this.map.marker.position.lat !== null &&
               this.map.marker.position.lng !== null)
                this.map.marker.main = new google.maps.Marker({
                    map: this.map.main,
                    position: this.map.marker.position
                });
        },
        focusPosition: function(){
            if(this.map.marker.position.lat !== null &&
               this.map.marker.position.lng !== null){
                this.map.main.setCenter({
                    lat: this.map.marker.position.lat,
                    lng: this.map.marker.position.lng
                });
                this.map.main.setZoom(this.map.data.zoom);
            }
        },
        positioner: function(pos){
            if(this.map.marker.main)
                this.map.marker.main.setPosition(pos);
            else
                this.map.marker.main = new google.maps.Marker({
                    map: this.map.main,
                    position: pos
                });
            this.map.marker.position.lat = pos.lat();
            this.map.marker.position.lng = pos.lng();
        },
        changeStep: function(e){
            this.actualStep = e;
            this.steps[e].seen = true;
        },
        setInterval: function(){
            var i,
                interval = Math.floor(parseInt(this.steps[this.actualStep].interval)) <= this.maxInterval ? Math.floor(parseInt(this.steps[this.actualStep].interval)) : this.maxInterval,
                length = this.steps[this.actualStep].schedule.length;
            if(length < interval)
                for(i = 0; i < interval - length; i++)
                    this.steps[this.actualStep].schedule.push({
                        begin: "",
                        end: "",
                        validBegin: true,
                        validEnd: true,
                        id: null,
                        remove: false
                    });
            else if(length > interval)
                for(i = 0; i < length; i++){
                    if(i >= interval)
                        this.steps[this.actualStep].schedule[i].remove = true;
                    else
                        this.steps[this.actualStep].schedule[i].remove = false;
                }
            else
                for(i = 0; i < length; i++)
                    this.steps[this.actualStep].schedule[i].remove = false;
        },
        validation: function(type, i){
            switch(type){
                case "name":
                    if(this.name.value === null ||
                       this.name.value === "" ||
                       this.name.value.length < 6)
                        this.name.valid = false;
                    else
                        this.name.valid = true;
                    break;
                case "time-begin":
                    this.steps[this.actualStep].schedule[i].validBegin = this.steps[this.actualStep].schedule[i].begin !== "" && this.steps[this.actualStep].schedule[i].begin.length === 8;
                    break;
                case "time-end":
                    this.steps[this.actualStep].schedule[i].validEnd = this.steps[this.actualStep].schedule[i].end !== "" && this.steps[this.actualStep].schedule[i].end.length === 8;
                    break;
            }
        },
        submit: function(){
            var me = this,
                i, j, k = 0, limit = 4,
                hmdB, hmdE,
                error = "",
                valid = true;
            if(this.name.value === null || this.name.value === ""){     //No name
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Nombre no puede estar vacío.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.name.valid = false;
            }
            else if(valid && (this.name.value.length < 6)){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Nombre debe contener al menos 6 caracteres.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.name.valid = false;
            }
            else if(this.map.marker.main === null ||                  //No position
                    this.map.marker.position.lat === null || this.map.marker.position.lng === null){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Debes escoger una ubicación.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.name.valid = false;
            }
            else{
                for(i = 0; i < this.steps.length; i++)
                    if(this.steps[i].active)
                        for(j = 0; j < this.steps[i].schedule.length; j++){
                            if(this.steps[i].schedule[j].remove === false){
                                hmdB = this.steps[i].schedule[j].begin.split(":");
                                hmdE = this.steps[i].schedule[j].end.split(":");
                                this.steps[i].schedule[j].validBegin = true;
                                this.steps[i].schedule[j].validEnd = true;
                                if(this.steps[i].schedule[j].begin === ""){
                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " en el día " + this.steps[i].text + " no puede estar vacío.<br>" : "";
                                    this.steps[i].schedule[j].validBegin = false;
                                    valid = false; k++;
                                }
                                if(this.steps[i].schedule[j].end === ""){
                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + " en el día " + this.steps[i].text + " no puede estar vacío.<br>" : "";
                                    this.steps[i].schedule[j].validEnd = false;
                                    valid = false; k++;
                                }
                                if(this.steps[i].schedule[j].begin !== "" &&
                                   (this.steps[i].schedule[j].begin > "23:59:59" ||
                                    hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59)){
                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " en el día " + this.steps[i].text + " no tiene un formato apropiado.<br>" : "";
                                    this.steps[i].schedule[j].validBegin = false;
                                    valid = false; k++;
                                }
                                if(this.steps[i].schedule[j].end !== "" &&
                                   (this.steps[i].schedule[j].end > "23:59:59" ||
                                    hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59)){
                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + " en el día " + this.steps[i].text + " no tiene un formato apropiado.<br>" : "";
                                    this.steps[i].schedule[j].validEnd = false;
                                    valid = false; k++;
                                }
                                if(this.steps[i].schedule[j].begin !== "" &&
                                   this.steps[i].schedule[j].end !== "" &&
                                   this.steps[i].schedule[j].begin >= this.steps[i].schedule[j].end){
                                    error += (k <= limit) ? "El final del intervalo " + (j + 1) + " en el día " + this.steps[i].text + " debe ser mayor al inicio del mismo.<br>" : "";
                                    this.steps[i].schedule[j].validBegin = false;
                                    this.steps[i].schedule[j].validEnd = false;
                                    valid = false; k++;
                                }
                                if(j > 0 &&
                                   this.steps[i].schedule[j].begin !== "" &&
                                   this.steps[i].schedule[j - 1].end !== "" &&
                                   this.steps[i].schedule[j].begin <= this.steps[i].schedule[j - 1].end){
                                    error += (k <= limit) ? "El inicio del intervalo " + (j + 1) + " debe ser mayor al final del intervalo " + j + " en el día " + this.steps[i].text + ".<br>": "";
                                    this.steps[i].schedule[j].validBegin = false;
                                    this.steps[i].schedule[j - 1].validEnd = false;
                                    valid = false; k++;
                                }
                            }
                        }
                    else
                        for(j = 0; j < this.steps[i].schedule.length; j++)
                            this.steps[i].schedule[j].remove = true;
                if(valid){
                    this.models.sucursal.patch({
                        delimiters: this.id,
                        params: {
                            nombre: this.name.value,
                            lat: this.map.marker.position.lat,
                            lng: this.map.marker.position.lng
                        }
                    },
                    function(success){
                        for(i = 0; i < me.steps.length; i++)
                            for(j = 0; j < me.steps[i].schedule.length; j++)
                                me.submitSchedule(i, j, success.body.id);
                        BUTO.components.main.children.tiendasRegistradas.grid.updatePagination();
                        BUTO.components.main.alert.description.title = "Edición de Tienda";
                        BUTO.components.main.alert.description.text = "Se ha editado correctamente la tienda '" + success.body.nombre + "'";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    },
                    function(error){
                        BUTO.components.main.alert.description.title = "Errores en Edición de Registro";
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
        },
        submitSchedule: function(i, j, id){
            if(this.steps[i].schedule[j].id !== null && this.steps[i].schedule[j].remove === true){ //Lets delete this schedule
                this.models.sucursalHorario.remove({
                    delimiters: [
                        id,
                        this.steps[i].schedule[j].id
                    ],
                    params: {
                        
                    }
                },
                function(success){
                    
                },
                function(error){
                    console.log(error);
                });
            }
            else if(this.steps[i].schedule[j].id !== null && this.steps[i].schedule[j].remove === false){ //Lets edit this schedule
                this.models.sucursalHorario.patch({
                    delimiters: [
                        id,
                        this.steps[i].schedule[j].id
                    ],
                    params: {
                        dia: this.steps[i].dayNumber,
                        hora_inicio: this.steps[i].schedule[j].begin,
                        hora_fin: this.steps[i].schedule[j].end
                    }
                },
                function(success){
                    
                },
                function(error){
                    console.log(error);
                });
            }
            else if(this.steps[i].schedule[j].id === null && this.steps[i].schedule[j].remove === false){ //Lets create this schedule
                this.models.sucursalHorario.post({
                    delimiters: id,
                    params: {
                        dia: this.steps[i].dayNumber,
                        hora_inicio: this.steps[i].schedule[j].begin,
                        hora_fin: this.steps[i].schedule[j].end
                    }
                },
                function(success){
                    
                },
                function(error){
                    console.log(error);
                });
            }
        }
    }
});