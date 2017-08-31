var verTienda = require("./../tiendas/verTienda.js");
module.exports = new Vue({
    data: {
        models: {
            ruta: null,
            rutaPunto: null,
            rutaPuntoServicio: null,
            cliente: null,
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
            marker: [
                {
                    main_begin: null,
                    main_end: null,
                    lat_begin: null,
                    lng_begin: null,
                    lat_end: null,
                    lng_end: null
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
        store: {
            data: {
                perPage: 20,
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
                    bounds: {
                        topLat: null,
                        topLng: null,
                        bottomLat: null,
                        bottomLng: null
                    }
                }
            },
            position: [],
            alterLinkDef: {
                see: {
                    first: true,
                    store: verTienda
                }
            }
        },
        points: []
    },
    methods: {
        init: function(e){
            var me = this;
            if(e){
                this.models.ruta = e.ruta;
                this.models.rutaPunto = e.rutaPunto;
                this.models.rutaPuntoServicio = e.rutaPuntoServicio;
                this.models.cliente = e.cliente;
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
            this.initGeocoder();
            this.initStore(0, 1);
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
        initStore: function(e, page){
            var i,
                me = this;
            if(page)
                this.store.data.page.store.currentPage = page;
            if(e === 0)
                this.store.alterLinkDef.see.first = true;
            if(this.store.position.length > 0){
                for(i = 0; i < this.store.position.length; i++)
                    this.store.position[i].main.setMap(null);
                this.store.position = [];
            }
            this.models.sucursal.get({
                params: {
                    "per-page": this.store.data.perPage,
                    "sort": "nombre",
                    "page": this.store.data.page.store.currentPage,
                    "nombre": this.store.data.search.store,
                    "hora_abierto": this.store.data.search.actualTime,
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
        },
        initMarker: function(e){
            var me = this,
                length = this.store.position.length;
            this.store.position.push({
                main: new google.maps.Marker({
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
                window: new google.maps.InfoWindow({
                    content: "Dirección no encontrada.",
                    maxWidth: 175
                }),
                id: e.id,
                lat: e.lat,
                lng: e.lng,
                name: e.nombre,
                linked: false,
                selected: false
            });
            this.store.position[length].main.addListener("rightclick", function(){
                me.store.position[length].window.open(me.map.main, me.store.position[length].main);
            });
            this.map.geocoder.geocode({                          //Geocoder for placing
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
        },
        seeStore: function(i){
            var me = this;
            this.store.alterLinkDef.see.store.id = this.store.position[i].id;
            Vue.nextTick(function(){
                me.store.alterLinkDef.see.store.init("modal", me.store.alterLinkDef.see.first);
                if(me.store.alterLinkDef.see.first === true)
                    me.store.alterLinkDef.see.first = false;
            });
        },
        setStep: function(){
            var me = this,
                valid = true,
                hmdB = this.begin.value.split(":"),
                hmdE = this.end.value.split(":");
            if(this.name.value === null || this.name.value === ""){     //No name
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Nombre no puede estar vacío.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.name.valid = false;
                this.name.text = "Nombre no puede estar vacío";
                valid = false;
            }
            else if(valid && this.name.value.length < 4){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "Nombre debe contener al menos 4 caracteres.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.name.valid = false;
                this.name.text = "Nombre no puede estar vacío";
                valid = false;
            }
            else if(valid && (this.begin.value === null || this.begin.value === "")){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "El horario de inicio no puede estar vacío.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.begin.valid = false;
                this.begin.text = "El horario de inicio no puede estar vacío";
                valid = false;
            }
            else if(valid && (this.begin.value.length !== 8 ||
                (this.begin.value > "23:59:59" ||
                 hmdB.length !== 3 || hmdB[0].length !== 2 || parseInt(hmdB[0]) > 23 || !hmdB[1] || hmdB[1].length !== 2 || parseInt(hmdB[1]) > 59 || !hmdB[2] || hmdB[2].length !== 2 || parseInt(hmdB[2]) > 59))){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "El horario de inicio no tiene un formato apropiado.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.begin.valid = false;
                this.begin.text = "El horario de inicio no tiene un formato apropiado";
                valid = false;
            }
            else if(valid && (this.end.value === null || this.end.value === "")){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "El horario de término no puede estar vacío.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.end.valid = false;
                this.end.text = "El horario de término no puede estar vacío";
                valid = false;
            }
            else if(valid && (this.end.value.length !== 8 ||
                (this.end.value > "23:59:59" ||
                 hmdE.length !== 3 || hmdE[0].length !== 2 || parseInt(hmdE[0]) > 23 || !hmdE[1] || hmdE[1].length !== 2 || parseInt(hmdE[1]) > 59 || !hmdE[2] || hmdE[2].length !== 2 || parseInt(hmdE[2]) > 59))){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "El horario de término no tiene un formato apropiado.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
                this.end.valid = false;
                this.end.text = "El horario de término no tiene un formato apropiado";
                valid = false;
            }
            else if(valid && this.begin.value >= this.end.value){
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = "El horario de término debe ser mayor al horario de inicio.";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
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
        setPoint: function(type){
            var me = this;
            switch(type){
                case "add":
                    
                    break;
                case "remove":
                    
                    break;
            }
        },
        //initConfiguration: function(auto){
        //    var i = 0, j;
        //    if(!auto){
        //        this.sameConf = !this.sameConf;
        //        this.steps[0].active = true;
        //        
        //        if(this.allPosVisible === 0)
        //            this.allPosVisible = 1;
        //    }
        //    for(j = 0; j < this.steps[i].schedule.length; j++){
        //        if(this.steps[i].schedule[j].main_begin !== null &&
        //           this.steps[i].schedule[j].lat_begin !== null &&
        //           this.steps[i].schedule[j].lng_begin !== null){    //Is showed in map
        //            this.steps[i].schedule[j].main_begin.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.map.marker[i][this.sameConf ? "textU_begin" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
        //            this.steps[i].schedule[j].main_begin.setMap(this.map.main);
        //        }
        //        if(this.steps[i].schedule[j].main_end !== null &&
        //           this.steps[i].schedule[j].lat_end !== null &&
        //           this.steps[i].schedule[j].lng_end !== null){    //Is showed in map
        //            this.steps[i].schedule[j].main_end.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.map.marker[i][this.sameConf ? "textU_end" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
        //            this.steps[i].schedule[j].main_end.setMap(this.map.main);
        //        }
        //    }
        //    
        //    this.setVisibilityPosition(true); //AUTO
        //},
        //setVisibilityPosition: function(auto){
        //    var i, j, k;
        //    if(!auto)
        //        this.allPosVisible = this.allPosVisible < 2 ? this.allPosVisible + 1 : 0;
        //    for(i = 0; i < this.steps.length; i++){
        //        if(this.steps[i].active){
        //            k = this.sameConf ? 0 : this.actualStep;
        //            for(j = 0; j < this.steps[i].schedule.length; j++){
        //                if(this.steps[i].schedule[j].main_begin !== null &&
        //                   this.steps[i].schedule[j].lat_begin !== null &&
        //                   this.steps[i].schedule[j].lng_begin !== null)
        //                    this.steps[i].schedule[j].main_begin.setMap(this.allPosVisible === 0 ? this.map.main :
        //                                                                          this.allPosVisible === 1 ? (i === k ? this.map.main : null) :
        //                                                                          ((i === k && this.steps[i].schedule[j].active) ? this.map.main : null));
        //                if(this.steps[i].schedule[j].main_end !== null &&
        //                   this.steps[i].schedule[j].lat_end !== null &&
        //                   this.steps[i].schedule[j].lng_end !== null)    //Is showed in map
        //                    this.steps[i].schedule[j].main_end.setMap(this.allPosVisible === 0 ? this.map.main :
        //                                                                          this.allPosVisible === 1 ? (i === k ? this.map.main : null) :
        //                                                                          ((i === k && this.steps[i].schedule[j].active) ? this.map.main : null));
        //            }
        //        }
        //    }
        //},
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
        positioner: function(pos){
            for(var j = 0; j < this.steps[this.sameConf ? 0 : this.actualStep].schedule.length; j++)
                if(this.steps[this.sameConf ? 0 : this.actualStep].active && this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].active){
                    if(this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_begin === null){
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_begin = new google.maps.Marker({
                                map: this.map.main,
                                position: pos,
                                icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.map.marker[this.sameConf ? 0 : this.actualStep][this.sameConf ? "textU_begin" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                            });
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lat_begin = pos.lat();
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lng_begin = pos.lng();
                        this.deleter("begin", this.sameConf ? 0 : this.actualStep, j);
                    }
                    else if(this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_begin &&
                            this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lat_begin === null &&
                            this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lng_begin === null){
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_begin.setMap(this.map.main);
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_begin.setPosition(pos);
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_begin.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=" + this.map.marker[this.sameConf ? 0 : this.actualStep][this.sameConf ? "textU_begin" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lat_begin = pos.lat();
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lng_begin = pos.lng();
                    }
                    else if(this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_begin &&
                            this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_end === null){
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_end = new google.maps.Marker({
                                map: this.map.main,
                                position: pos,
                                icon: "https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.map.marker[this.sameConf ? 0 : this.actualStep][this.sameConf ? "textU_end" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"
                            });
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_end.addListener("dblclick", function(){
                            
                        });
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lat_end = pos.lat();
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lng_end = pos.lng();
                        this.deleter("end", this.sameConf ? 0 : this.actualStep, j);
                    }
                    else if(this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_end &&
                            this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lat_end === null &&
                            this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lng_end === null){
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_end.setMap(this.map.main);
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_end.setPosition(pos);
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].main_end.setIcon("https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=" + this.map.marker[this.sameConf ? 0 : this.actualStep][this.sameConf ? "textU_end" : "text"] + (j + 1) + "&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1");
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lat_end = pos.lat();
                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[j].lng_end = pos.lng();
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
        //changeStep: function(e){
        //    this.actualStep = e;
        //    this.steps[e].seen = true;
        //    
        //    if(this.allPosVisible > 0)
        //        this.setVisibilityPosition(true); //AUTO
        //},
        //setInterval: function(){
        //    var i,
        //        newSchedule = [],
        //        interval = Math.floor(parseInt(this.steps[this.sameConf ? 0 : this.actualStep].interval)) <= this.maxInterval ? Math.floor(parseInt(this.steps[this.sameConf ? 0 : this.actualStep].interval)) : this.maxInterval,
        //        length = this.steps[this.sameConf ? 0 : this.actualStep].schedule.length;
        //    if(!isNaN(Math.floor(parseInt(this.steps[this.sameConf ? 0 : this.actualStep].interval)))){
        //        if(this.steps[this.sameConf ? 0 : this.actualStep].schedule.length < interval){
        //            for(i = 0; i < interval - length; i++)
        //                this.steps[this.sameConf ? 0 : this.actualStep].schedule.push({
        //                    begin: "",
        //                    end: "",
        //                    validBegin: true,
        //                    validEnd: true,
        //                    textBegin: "hh:mm:ss",
        //                    textEnd: "hh:mm:ss",
        //                    
        //                    main_begin: null,
        //                    main_end: null,
        //                    lat_begin: null,
        //                    lng_begin: null,
        //                    lat_end: null,
        //                    lng_end: null,
        //                    active: false
        //                });
        //        }
        //        else if(length > interval){
        //            for(i = 0; i < length; i++)
        //                if(i < interval)
        //                    newSchedule.push(this.steps[this.sameConf ? 0 : this.actualStep].schedule[i]);
        //                else{
        //                    if(this.steps[this.sameConf ? 0 : this.actualStep].schedule[i].main_begin !== null &&
        //                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[i].lat_begin !== null &&
        //                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[i].lng_begin !== null)
        //                         this.steps[this.sameConf ? 0 : this.actualStep].schedule[i].main_begin.setMap(null);
        //                    if(this.steps[this.sameConf ? 0 : this.actualStep].schedule[i].main_end !== null &&
        //                       this.steps[this.sameConf ? 0 : this.actualStep].schedule[i].lat_end !== null &&
        //                       this.steps[this.sameConf ? 0 : this.actualStep].schedule[i].lng_end !== null)    //Is showed in map
        //                        this.steps[this.sameConf ? 0 : this.actualStep].schedule[i].main_end.setMap(null);
        //                }
        //            this.steps[this.sameConf ? 0 : this.actualStep].schedule = newSchedule;
        //            this.setActivity(true);
        //        }
        //        if(this.steps[this.sameConf ? 0 : this.actualStep].schedule.length > 0)
        //            this.setActiveInterval(0);
        //    }
        //},
        //setActivity: function(auto){
        //    if(!auto)
        //        this.steps[this.actualStep].active = !this.steps[this.actualStep].active;
        //    if(!this.steps[this.actualStep].active){
        //        for(var j = 0; j < this.steps[this.actualStep].schedule.length; j++){
        //            if(this.steps[this.actualStep].schedule[j].main_begin !== null &&
        //               this.steps[this.actualStep].schedule[j].lat_begin !== null &&
        //               this.steps[this.actualStep].schedule[j].lng_begin !== null)
        //                this.steps[this.actualStep].schedule[j].main_begin.setMap(null);
        //            if(this.steps[this.actualStep].schedule[j].main_end !== null &&
        //               this.steps[this.actualStep].schedule[j].lat_end !== null &&
        //               this.steps[this.actualStep].schedule[j].lng_end !== null)    //Is showed in map
        //                this.steps[this.actualStep].schedule[j].main_end.setMap(null);
        //        }
        //    }
        //    else 
        //        this.setVisibilityPosition(true); //AUTO
        //},
        submit: function(e){
            var me = this;
            switch(e){
                case "manual":
                    var i, j, k = 0, limit = 4,
                        first = true,
                        hmdB, hmdE,
                        error = "",
                        valid = true;
                    if(this.name.value === null || this.name.value === ""){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Nombre no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.name.valid = false;
                        this.name.text = "Nombre no puede estar vacío";
                        valid = false;
                    }
                    else if(valid && this.name.value.length < 4){
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Nombre debe contener al menos 4 caracteres.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.name.valid = false;
                        this.name.text = "Nombre debe contener al menos 8 caracteres";
                        valid = false;
                    }
                    if(valid && (this.email.value === null || this.email.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Correo electrónico no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.email.valid = false;
                        this.email.text = "Correo electrónico no puede estar vacío";
                        valid = false;
                    }
                    else{
                        var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(valid && !emailTest.test(this.email.value)){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Correo electrónico no tiene una forma válida.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.email.valid = false;
                            this.email.text = "Correo electrónico no tiene una forma válida";
                            valid = false;
                        }
                    }
                    if(valid && (this.pass.value === null || this.pass.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Contraseña no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.pass.valid = false;
                        this.pass.text = "Contraseña no puede estar vacío";
                        valid = false;
                    }
                    else{
                        if(valid && this.pass.value.length < 8){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Contraseña debe contener al menos 8 caracteres.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.pass.valid = false;
                            this.pass.text = "Contraseña debe contener al menos 8 caracteres";
                            valid = false;
                        }
                    }
                    if(valid && (this.repass.value === null || this.repass.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Confirmar contraseña no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.repass.valid = false;
                        this.repass.text = "Confirmar contraseña no puede estar vacío";
                        valid = false;
                    }
                    else{
                        if(valid && (this.repass.value !== this.pass.value)){
                            BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                            BUTO.components.main.alert.description.text = "Las contraseñas no coinciden.";
                            BUTO.components.main.alert.description.ok = "Aceptar";
                            BUTO.components.main.alert.active = true;
                            this.repass.valid = false;
                            this.repass.text = "Las contraseñas no coinciden";
                            valid = false;
                        }
                    }
                    if(valid && (this.date.value === null || this.date.value === "")){     //No name
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Fecha de ingreso no puede estar vacío.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                        this.date.valid = false;
                        this.date.text = "Fecha de ingreso no puede estar vacío";
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
                            this.models.usuarioEmpleado.post({
                                params: {
                                    nombre: this.name.value,
                                    correo: this.email.value,
                                    pass: this.pass.value,
                                    pass_repeat: this.repass.value,
                                    fecha_ingreso: this.date.value
                                }
                            },function(success){
                                for(i = 0; i < me.steps.length; i++)
                                    if((me.steps[i].active && me.steps[i].schedule.length > 0) || me.sameConf){
                                        for(j = 0; j < me.steps[me.sameConf ? 0 : i].schedule.length; j++){
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
                    dia: this.steps[i].dayNumber,
                    hora_inicio: this.steps[this.sameConf ? 0 : i].schedule[j].begin,
                    hora_fin: this.steps[this.sameConf ? 0 : i].schedule[j].end,
                    lat_inicio: this.steps[this.sameConf ? 0 : i].schedule[j].lat_begin,
                    lat_fin: this.steps[this.sameConf ? 0 : i].schedule[j].lat_end,
                    lng_inicio: this.steps[this.sameConf ? 0 : i].schedule[j].lng_begin,
                    lng_fin: this.steps[this.sameConf ? 0 : i].schedule[j].lng_end
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
                    this.name.value = null;
                    this.email.value = null;
                    this.pass.value = null;
                    this.repass.value = null;
                    this.date.value = null;
                    this.actualStep = 0;
                    this.allPosVisible = 0;
                    break;
                case "schedule":
                    this.steps[i].active = true;
                    this.steps[i].interval = 1;
                    this.steps[i].seen = (this.steps[i].dayNumber === 2) ? true : false;
                    if(!this.sameConf){
                        if(!this.sameConf && j !== null){
                            if(this.steps[i].schedule[j].main_begin !== null)
                                this.steps[i].schedule[j].main_begin.setMap(null);
                            if(this.steps[i].schedule[j].main_end !== null)
                                this.steps[i].schedule[j].main_end.setMap(null);
                        }
                        else if(!this.sameConf && j === null){
                            for(j = 0; j < this.steps[i].length; j++){
                                if(this.steps[i].schedule[j].main_begin !== null)
                                this.steps[i].schedule[j].main_begin.setMap(null);
                            if(this.steps[i].schedule[j].main_end !== null)
                                this.steps[i].schedule[j].main_end.setMap(null);
                            }
                        }
                    }
                    if(this.steps[i].dayNumber === 1 &&
                        j === this.steps[this.sameConf ? 0 : i].schedule.length - 1)
                        this.reset("all");
                    break;
                case "all":
                    this.name.value = null;
                    this.name.valid = true;
                    this.email.value = null;
                    this.email.valid = true;
                    this.pass.value = null;
                    this.pass.valid = true;
                    this.repass.value = null;
                    this.repass.valid = true;
                    this.date.value = null;
                    this.date.valid = true;
                    this.actualStep = 0;
                    this.allPosVisible = 0;
                    this.sameConf = false;
                    
                    for(i = 0; i < this.steps.length; i++){
                        for(j = 0; j < this.steps[i].schedule.length; j++){
                            if(this.steps[i].schedule[j].main_begin !== null)
                                this.steps[i].schedule[j].main_begin.setMap(null);
                            if(this.steps[i].schedule[j].main_end !== null)
                                this.steps[i].schedule[j].main_end.setMap(null);
                        }
                        this.steps[i].active = true;
                        this.steps[i].interval = 1;
                        this.steps[i].seen = (this.steps[i].dayNumber === 2) ? true : false;
                        this.steps[i].schedule = [];
                        this.steps[i].schedule.push({
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