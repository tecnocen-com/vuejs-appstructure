module.exports = new Vue({
    data: {
        id: null,
        name: null,
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
                zoom: 18
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
        init: function(){
            var me = this;
            this.models.sucursal.get({
                delimiters: this.id
            },
            function(success){
                me.name = success.body.nombre;
                me.map.marker.position.lat = success.body.lat;
                me.map.marker.position.lng = success.body.lng;
                me.initMap();
            },
            function(error){
                console.log(error);
            });
            this.models.sucursalHorario.get({
                delimiters: this.id,
                params: {
                    "per-page": 100
                }
            },
            function(success){
                var interval = [0, 0, 0, 0, 0, 0, 0];
                for(var i = 0; i < success.body.length; i++){
                    interval[success.body[i].dia - 1]++;
                    switch(success.body[i].dia){
                        case 1:     //SUN
                            me.steps[6].schedule.push({
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin
                            });
                            break;
                        default:
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
                }
            },
            function(error){
                console.log(error);
            });
        },
        initMap: function(){
            this.map.main = new google.maps.Map(document.getElementById('mapAddStore'), {     //Define Map
                zoom: this.map.data.zoom,
                center: this.map.marker.position
            });
            this.initPosition();
        },
        initPosition: function(){
            this.map.marker.main = new google.maps.Marker({
                map: this.map.main,
                position: this.map.marker.position
            });
        },
        changeStep: function(e){
            this.actualStep = e;
            this.steps[e].seen = true;
        }
    }
});