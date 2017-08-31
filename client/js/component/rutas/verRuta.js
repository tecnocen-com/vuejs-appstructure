module.exports = new Vue({
    data: {
        id: null,
        name: null,
        models: {
            ruta: null,
            rutaPunto: null,
            rutaPuntoServicio: null
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
                address: "Ciudad de México, México",
                zoom: 13
            }
        },
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
            //var me = this;
            //this.actualStep = 0;
            //for(var i = 0; i < me.steps.length; i++)
            //    this.steps[i].schedule = [];
            //this.models.sucursal.get({
            //    delimiters: this.id
            //},
            //function(success){
            //    me.name = success.body.nombre;
            //    me.map.marker.position.lat = success.body.lat;
            //    me.map.marker.position.lng = success.body.lng;
            //    if(type === "modal"){
            //        setTimeout(function(){
            //            me.initMap(type, first);
            //        }, 250);
            //    }
            //    else
            //        me.initMap(type, first);
            //},
            //function(error){
            //    console.log(error);
            //});
            //this.models.sucursalHorario.get({
            //    delimiters: this.id,
            //    params: {
            //        "per-page": 100,
            //        "sort": "hora_inicio"
            //    }
            //},
            //function(success){
            //    var interval = [0, 0, 0, 0, 0, 0, 0];
            //    for(i = 0; i < success.body.length; i++){
            //        interval[success.body[i].dia - 1]++;
            //        switch(success.body[i].dia){
            //            case 1:     //SUN
            //                me.steps[6].schedule.push({
            //                    begin: success.body[i].hora_inicio,
            //                    end: success.body[i].hora_fin
            //                });
            //                break;
            //            default:
            //                me.steps[success.body[i].dia - 2].schedule.push({
            //                    begin: success.body[i].hora_inicio,
            //                    end: success.body[i].hora_fin
            //                });
            //                break;
            //        }
            //    }
            //    for(i = 0; i < me.steps.length; i++){
            //        me.steps[i].active = (i === me.steps.length - 1) ? interval[0] === 0 ? false : true : interval[i + 1] === 0 ? false : true;
            //        me.steps[i].interval = (i === me.steps.length - 1) ? interval[0] : interval[i + 1];
            //    }
            //},
            //function(error){
            //    console.log(error);
            //});
        },
        initMap: function(type, first){
            if(type !== "modal" || (type === "modal" && first))
                this.map.main = new google.maps.Map(document.getElementById('mapSeeStore'), {     //Define Map
                    zoom: this.map.data.zoom,
                    center: this.map.marker.position
                });
            else
                this.map.main.setCenter(this.map.marker.position);
            this.initPosition();
            if(type !== "modal" || first)
                this.initFocus();
        },
        initFocus: function(){
            this.map.main.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('mapFocusPositionSeeStore'));
        },
        initPosition: function(){
            this.map.marker.main = new google.maps.Marker({
                map: this.map.main,
                position: this.map.marker.position
            });
        },
        focusPosition: function(){
            this.map.main.setCenter({
                lat: this.map.marker.position.lat,
                lng: this.map.marker.position.lng
            });
            this.map.main.setZoom(this.map.data.zoom);
        },
        changeStep: function(e){
            this.actualStep = e;
            this.steps[e].seen = true;
        }
    }
});