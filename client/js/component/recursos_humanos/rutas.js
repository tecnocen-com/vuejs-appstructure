var verRuta = require("./../rutas/verRuta.js");
module.exports = new Vue({
    data: {
        client: {
            id: null,
            name: null
        },
        models: {
            empleadoHorario: null,
            ruta: null,
            rutaPunto: null,
            rutaPuntoServicio: null,
            sucursal: null,
            sucursalHorario: null,
            sucursalCliente: null,
            proyeccionServicio: null,
            proyeccionTrabajo: null,
            proyeccionTrabajoServicio: null
        },
        steps: [
            {
                schedule: []
            },
            {
                schedule: []
            },
            {
                schedule: []
            },
            {
                schedule: []
            },
            {
                schedule: []
            },
            {
                schedule: []
            },
            {
                schedule: []
            }
        ],
        day: {
            index: 0,
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
        data: {
            perPage: 15,
            search: {
                route: "",
                routeLinked: ""
            },
            page: {
                route: {
                    currentPage: 1,
                    pageCount: null,
                    totalCount: null
                },
                routeLinked: {
                    currentPage: 1,
                    pageCount: null,
                    totalCount: null
                }
            }
        },
        route: [],
        routeLinked: [],
        alterLinkDef: {
            masive: {
                config: {
                    active: 0,  //0 nothing to see, 1 remove, 2 add
                    same: false
                }
            },
            add: {
                route: {
                    id: null,
                    name: null,
                    begin: null,
                    end: null
                },
                scheduleId: null,
                scheduleIndex: null,
                date: {
                    value: null,
                    valid: true,
                    text: ""
                }
            },
            remove: [],
            edit: {
                id: null,
                routeName: null,
                date: {
                    value: null,
                    valid: true,
                    text: ""
                }
            },
            see: {
                first: true,
                route: verRuta,
                routeLinked: {
                    date: null
                }
            }
        }
    },
    methods: {
        init: function(e, page){
            var i,
                me = this;
            if(page)
                this.data.page.route.currentPage = page;
            if(e === 0 && page)
                this.alterLinkDef.see.first = true;
            if(e === 0){
                this.initSchedule();
                Vue.nextTick(function(){
                    setTimeout(function(){
                        $( "#addDate" ).datepicker({
                            dateFormat: "yy-mm-dd",
                            onSelect: function(e){
                                me.alterLinkDef.add.date.value = e;
                                me.validation("add");
                            }
                        });
                        $( "#editDate" ).datepicker({
                            dateFormat: "yy-mm-dd",
                            onSelect: function(e){
                                me.alterLinkDef.edit.date.value = e;
                                me.validation("edit");
                            }
                        });
                    }, 100);
                });
            }
            if(e === 0 || e === 1){             //0 all, 1 route, 2 routeLinked
                this.route = [];
                this.models.ruta.get({
                    params: {
                        "per-page": this.data.perPage,
                        "sort": "nombre",
                        "page": this.data.page.route.currentPage,
                        "dia": this.day.value,
                        "nombre": this.data.search.route
                    }
                },
                function(success){
                    me.data.page.route.pageCount = parseInt(success.headers.get("x-pagination-page-count"));
                    me.data.page.route.totalCount = parseInt(success.headers.get("x-pagination-total-count"));
                    for(i in success.body)
                        me.initRoute(success.body[i]);
                },
                function(error){
                    console.log(error);
                });
            }
        },
        initSchedule: function(){
            var me = this, length, i;
            for(i = 0; i < me.steps.length; i++)
                me.steps[i].schedule = [];
            this.models.empleadoHorario.get({
                delimiters: this.client.id,
                params: {
                    "per-page": 100,
                    "sort": "hora_inicio"
                }
            },
            function(success){
                for(i = 0; i < success.body.length; i++){
                    switch(success.body[i].dia){
                        case 1:     //SUN
                            length = me.steps[6].schedule.length;
                            me.steps[6].schedule.push({
                                id: success.body[i].id,
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin,
                                route: []
                            });
                            break;
                        default:
                            length = me.steps[success.body[i].dia - 2].schedule.length;
                            me.steps[success.body[i].dia - 2].schedule.push({
                                id: success.body[i].id,
                                begin: success.body[i].hora_inicio,
                                end: success.body[i].hora_fin,
                                route: []
                            });
                            break;
                    }
                    me.initRouteLinked(success.body[i].dia === 1 ? 6 : success.body[i].dia - 2, length);
                }
            },
            function(error){
                console.log(error);
            });
        },
        initRoute: function(e){
            this.route.push({
                id: e.id,
                name: e.nombre,
                begin: e.hora_inicio,
                end: e.hora_fin,
                linked: false,
                selected: false
            });
        },
        initRouteLinked: function(i, j){
            var me = this, k;
            this.models.proyeccionTrabajo.get({
                params: {
                    "empleado_horario_id": this.steps[i].schedule[j].id,
                    "expand": "cliente, sucursal, ruta, punto, empleado"
                }
            },
            function(success){
                for(k = 0; k < success.body.length; k++){
                    me.steps[i].schedule[j].route.push({
                        id: success.body[k].id,
                        idRoute: success.body[k]._embedded.ruta.id,
                        name: success.body[k]._embedded.ruta.nombre,
                        date: success.body[k].fecha
                    });
                }
            },
            function(error){
                console.log(error);
            });
        },
        validation: function(type){
            var me = this;
            switch(type){
                case "add":
                    this.alterLinkDef.add.date.valid = false;
                    if(this.alterLinkDef.add.date.value === "" ||
                       this.alterLinkDef.add.date.value === null)
                        this.alterLinkDef.add.date.text = "Fecha no puede estar vacío";
                    else{
                        this.alterLinkDef.add.date.text = "";
                        this.alterLinkDef.add.date.valid = true;
                    }
                    break;
                case "edit":
                    this.alterLinkDef.edit.date.valid = false;
                    if(this.alterLinkDef.edit.date.value === "" ||
                       this.alterLinkDef.edit.date.value === null)
                        this.alterLinkDef.edit.date.text = "Fecha no puede estar vacío";
                    else{
                        this.alterLinkDef.edit.date.text = "";
                        this.alterLinkDef.edit.date.valid = true;
                    }
                    break;
            }
        },
        setLink: function(type, i, j){
            var me = this;
            switch(type){
                case "add":
                    this.alterLinkDef.add.route.id = this.route[i].id;
                    this.alterLinkDef.add.route.name = this.route[i].name;
                    this.alterLinkDef.add.route.begin = this.route[i].begin;
                    this.alterLinkDef.add.route.end = this.route[i].end;
                    this.alterLinkDef.add.scheduleId = null;
                    this.alterLinkDef.add.scheduleIndex = null;
                    this.alterLinkDef.add.date.value = null;
                    break;
                case "edit":
                    this.alterLinkDef.edit.id = this.steps[this.day.index].schedule[i].route[j].id;
                    this.alterLinkDef.edit.routeName = this.steps[this.day.index].schedule[i].route[j].name;
                    this.alterLinkDef.edit.date.value = this.steps[this.day.index].schedule[i].route[j].date;
                    break;
                case "see":
                    this.alterLinkDef.see.route.id = this.route[i].id;
                    this.alterLinkDef.see.routeLinked.date = null;
                    Vue.nextTick(function(){
                        me.alterLinkDef.see.route.init("modal", me.alterLinkDef.see.first);
                        if(me.alterLinkDef.see.first === true)
                            me.alterLinkDef.see.first = false;
                    });
                    break;
                case "seeLinked":
                    this.alterLinkDef.see.route.id = this.steps[this.day.index].schedule[i].route[j].idRoute;
                    this.alterLinkDef.see.routeLinked.date = this.steps[this.day.index].schedule[i].route[j].date;
                    Vue.nextTick(function(){
                        me.alterLinkDef.see.route.init("modal", me.alterLinkDef.see.first);
                        if(me.alterLinkDef.see.first === true)
                            me.alterLinkDef.see.first = false;
                    });
                    break;
            }
        },
        alterLink: function(type){
            var i,
                valid = true;
            switch(type){
                case "add":
                    for(i = 0; i < this.alterLinkDef.add.length; i++){
                        this.validation(type, this.alterLinkDef.masive.config.same ? 0 : i);
                        if(this.alterLinkDef.add[this.alterLinkDef.masive.config.same ? 0 : i].valid === false)
                            valid = false;
                    }
                    if(valid){
                        for(i = 0; i < this.alterLinkDef.add.length; i++)
                            this.add(this.alterLinkDef.add[i].id, this.alterLinkDef.add[this.alterLinkDef.masive.config.same ? 0 : i].time, i);
                    }
                    else{
                        BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                        BUTO.components.main.alert.description.text = "Existen errores en los tiempos requeridos, inténtalo de nuevo.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    break;
                case "edit":
                    if(this.alterLinkDef.edit.time === null){
                        this.alterLinkDef.edit.time = "";
                        this.validation(type);
                    }
                    if(this.alterLinkDef.edit.valid === false)
                        valid = false;
                    if(valid)
                        this.edit();
                    else{
                        BUTO.components.main.alert.description.title = "Errores en Edición de Registro";
                        BUTO.components.main.alert.description.text = "Existen errores en los tiempos requeridos, inténtalo de nuevo.";
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    }
                    break;
            }
        },
        add: function(){
            var me = this,
                valid = true;
            this.validation("add");
            if(this.alterLinkDef.add.scheduleId === null){
                BUTO.components.main.alert.description.text = "Debes seleccionar un horario para ligar la ruta.";
                valid = false;
            }
            else if(valid && !this.alterLinkDef.add.date.valid){
                BUTO.components.main.alert.description.text = "Fecha no puede estar vacío.";
                valid = false;
            }
            if(valid){
                this.models.proyeccionTrabajo.post({
                    params: {
                        ruta_id: this.alterLinkDef.add.route.id,
                        empleado_horario_id: this.alterLinkDef.add.scheduleId,
                        fecha: this.alterLinkDef.add.date.value 
                    }
                },
                function(success){
                    me.initSchedule();
                    document.getElementById("closeAdd").click();
                },
                function(error){
                    console.log(error);
                    BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                    BUTO.components.main.alert.description.text = error.body[0].message;
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                });
            }
            else{
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            }
        },
        edit: function(){
            var me = this,
                valid = true;
            this.validation("add");
            if(!this.alterLinkDef.edit.date.valid){
                BUTO.components.main.alert.description.text = "Fecha no puede estar vacío.";
                valid = false;
            }
            if(valid){
                this.models.proyeccionTrabajo.patch({
                    delimiters: this.alterLinkDef.edit.id,
                    params: {
                        fecha: this.alterLinkDef.edit.date.value 
                    }
                },
                function(success){
                    me.initSchedule();
                    document.getElementById("closeEdit").click();
                },
                function(error){
                    console.log(error);
                    BUTO.components.main.alert.description.title = "Errores en Edición Registro";
                    BUTO.components.main.alert.description.text = error.body[0].message;
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                });
            }
            else{
                BUTO.components.main.alert.description.title = "Errores en Edición Registro";
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            }
        },
        remove: function(id){
            var me = this;
            BUTO.components.main.confirm.description.title = "Confirmación de borrado";
            BUTO.components.main.confirm.description.text = "¿Deseas borrar el registro seleccionado?";
            BUTO.components.main.confirm.description.accept = "Aceptar";
            BUTO.components.main.confirm.description.cancel = "Cancelar";
            BUTO.components.main.confirm.active = true;
            BUTO.components.main.confirm.onAccept = function(){
                me.models.proyeccionTrabajo.remove({
                    delimiters: id,
                    params: {}
                },
                function(success){
                    me.initSchedule();
                    BUTO.components.main.confirm.active = false;
                },
                function(error){
                    console.log(error);
                    BUTO.components.main.alert.description.title = "Errores en Borrado de Registro";
                    BUTO.components.main.alert.description.text = error.body.message;
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                    BUTO.components.main.confirm.active = false;
                });
            };
        }
    }
});