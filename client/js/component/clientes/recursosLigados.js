var verRecurso = require("./../recursos_humanos/verRecurso.js");
module.exports = new Vue({
    data: {
        client: {
            id: null,
            name: null
        },
        data: {
            perPage: 15,
            search: {
                resource: "",
                resourceLinked: ""
            },
            page: {
                resource: {
                    currentPage: 1,
                    pageCount: null,
                    totalCount: null
                },
                resourceLinked: {
                    currentPage: 1,
                    pageCount: null,
                    totalCount: null
                }
            }
        },
        models: {
            clienteEmpleado: null,
            usuarioEmpleado: null,
            empleado: null,
            empleadoHorario: null
        },
        resource: [],
        resourceLinked: [],
        alterLinkDef: {
            masive: {
                config: {
                    active: 0  //0 nothing to see, 1 remove, 2 add
                }
            },
            add: [],
            remove: [],
            edit: {
                    id: null,
                    index: null,
                    name: null,
                    time: null,
                    valid: true,
                    text: "hh:mm:ss"
            },
            see: {
                first: true,
                resource: verRecurso,
                resourceLinked: {
                    name: null,
                    time: null
                }
            }
        }
    },
    methods: {
        init: function(e, page, pageLinked){
            var i,
                me = this;
            if(e === 0)
                BUTO.components.main.loader.active = true;
            if(page)
                this.data.page.resource.currentPage = page;
            if(pageLinked)
                this.data.page.resourceLinked.currentPage = pageLinked;
            if(e === 0 && page && pageLinked)
                this.alterLinkDef.see.first = true;
            if(e === 0 || e === 1){             //0 all, 1 resource, 2 resourceLinked
                this.resource = [];
                this.models.usuarioEmpleado.get({
                    params: {
                        "per-page": this.data.perPage,
                        "sort": "nombre",
                        "page": this.data.page.resource.currentPage,
                        "nombre": this.data.search.resource
                    }
                },
                function(success){
                    me.data.page.resource.pageCount = parseInt(success.headers.get("x-pagination-page-count"));
                    me.data.page.resource.totalCount = parseInt(success.headers.get("x-pagination-total-count"));
                    for(i = 0; i < success.body.length; i++)
                        me.initResource(success.body[i]);
                    if(e === 0){
                        me.resourceLinked = [];
                        me.models.clienteEmpleado.get({
                            delimiters: me.client.id,
                            params: {
                                "per-page": me.data.perPage,
                                "page": me.data.page.resourceLinked.currentPage,
                                "expand": "empleado"
                            }
                        },
                        function(success2){
                            me.data.page.resourceLinked.pageCount = parseInt(success2.headers.get("x-pagination-page-count"));
                            me.data.page.resourceLinked.totalCount = parseInt(success2.headers.get("x-pagination-total-count"));
                            if(success2.body.length === 0)
                                BUTO.components.main.loader.active = false;
                            else
                                for(i = 0; i < success2.body.length; i++)
                                    me.initResourceLinked(success2.body[i].empleado_id, i, success2.body.length - 1);
                        },
                        function(error){
                            console.log(error);
                        });
                    }
                },
                function(error){
                    console.log(error);
                });
            }
            else if(e === 2){
                this.resourceLinked = [];
                this.models.clienteEmpleado.get({
                    delimiters: this.client.id,
                    params: {
                        "per-page": this.data.perPage,
                        "page": this.data.page.resourceLinked.currentPage,
                        "expand": "empleado"
                    }
                },
                function(success){
                    me.data.page.resourceLinked.pageCount = parseInt(success.headers.get("x-pagination-page-count"));
                    me.data.page.resourceLinked.totalCount = parseInt(success.headers.get("x-pagination-total-count"));
                    for(i = 0; i < success.body.length; i++)
                        me.initResourceLinked(success.body[i].empleado_id);
                },
                function(error){
                    console.log(error);
                });
            }
        },
        initResource: function(e){
            var me = this,
                length = me.resource.length;
            me.resource.push({
                id: e.id,
                name: e.nombre,
                linked: false,
                selected: false
            });
            this.models.clienteEmpleado.get({
                delimiters: [
                    me.client.id,
                    e.id
                ]
            },
            function(){
                me.resource[length].linked = true;
            },
            function(){});
        },
        initResourceLinked: function(id, i, j){
            var me = this;
            this.models.usuarioEmpleado.get({
                delimiters: id,
                params: {}
            },
            function(success){
                me.resourceLinked.push({
                    id: success.body.id,
                    name: success.body.nombre,
                    selected: false
                });
            },
            function(error){
                console.log(error);
            });
            if(i === j)
                BUTO.components.main.loader.active = false;
        },
        initDrag: function(type, e){
            var me = this;
            if(e.tagName === "TR")
                switch(type){
                    case "add":
                        Vue.nextTick(function(){
                            setTimeout(function(){
                                me.alterLinkDef.masive.config.active = 2;
                            }, 50);
                        });
                        break;
                    case "remove":
                        Vue.nextTick(function(){
                            setTimeout(function(){
                                me.alterLinkDef.masive.config.active = 1;
                            }, 50);
                        });
                        break;
                }
        },
        setMasive: function(type){
            var i,
                me = this;
            switch(type){
                case "add":
                    BUTO.components.main.confirm.description.title = "Confirmación de ligado de recursos";
                    BUTO.components.main.confirm.description.text = "¿Deseas ligar todos los registros seleccionados?";
                    BUTO.components.main.confirm.description.accept = "Aceptar";
                    BUTO.components.main.confirm.description.cancel = "Cancelar";
                    BUTO.components.main.confirm.active = true;
                    BUTO.components.main.confirm.onAccept = function(){
                        me.alterLinkDef.add = [];
                        for(i = 0; i < me.resource.length; i++)
                            if(me.resource[i].selected === true &&
                               me.resource[i].linked === false)
                                me.setLink(type, i, true); //AUTO
                        me.alterLink("add");
                    };
                    break;
                case "remove":
                    this.alterLinkDef.remove = [];
                    for(i = 0; i < this.resourceLinked.length; i++)
                        if(this.resourceLinked[i].selected === true)
                            this.alterLinkDef.remove.push({
                                id: this.resourceLinked[i].id
                            });
                    BUTO.components.main.confirm.description.title = "Confirmación de borrado";
                    BUTO.components.main.confirm.description.text = "¿Deseas borrar todos los registros seleccionados?";
                    BUTO.components.main.confirm.description.accept = "Aceptar";
                    BUTO.components.main.confirm.description.cancel = "Cancelar";
                    BUTO.components.main.confirm.active = true;
                    BUTO.components.main.confirm.onAccept = function(){
                        for(i = 0; i < me.alterLinkDef.remove.length; i++)
                            me.remove(me.alterLinkDef.remove[i].id, true, i);
                    };
                    break;
            }
        },
        setLink: function(type, i, auto){
            var me = this;
            switch(type){
                case "add":
                    if(!auto)
                        this.alterLinkDef.add = [];
                    this.alterLinkDef.add.push({
                        id: this.resource[i].id,
                        index: i
                    });
                    if(!auto){
                        BUTO.components.main.confirm.description.title = "Confirmación de ligado de recursos";
                        BUTO.components.main.confirm.description.text = "¿Deseas ligar el registro seleccionado?";
                        BUTO.components.main.confirm.description.accept = "Aceptar";
                        BUTO.components.main.confirm.description.cancel = "Cancelar";
                        BUTO.components.main.confirm.active = true;
                        BUTO.components.main.confirm.onAccept = function(){
                            me.alterLink("add");
                        };
                    }
                    break;
                case "edit":
                    this.alterLinkDef.edit.index = i;
                    this.alterLinkDef.edit.name = this.resourceLinked[i].name;
                    this.alterLinkDef.edit.time = this.resourceLinked[i].time;
                    this.alterLinkDef.edit.id = this.resourceLinked[i].id;
                    break;
                case "see":
                    this.alterLinkDef.see.resource.id = this.resource[i].id;
                    Vue.nextTick(function(){
                        me.alterLinkDef.see.resource.init("modal", me.alterLinkDef.see.first);
                        if(me.alterLinkDef.see.first === true)
                            me.alterLinkDef.see.first = false;
                    });
                    break;
                case "seeLinked":
                    this.alterLinkDef.see.resourceLinked.name = this.resourceLinked[i].name;
                    this.alterLinkDef.see.resourceLinked.time = this.resourceLinked[i].time;
                    break;
            }
        },
        alterLink: function(type){
            var i,
                valid = true;
            switch(type){
                case "add":
                    for(i = 0; i < this.alterLinkDef.add.length; i++)
                        this.add(this.alterLinkDef.add[i].id, i);
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
        add: function(id, i){
            var me = this;
            this.models.clienteEmpleado.post({
                delimiters: this.client.id,
                params: {
                    empleado_id: id
                }
            },
            function(success){
                if(me.alterLinkDef.add.length - 1 === i){
                    me.alterLinkDef.add = [];
                    me.init(0);
                    BUTO.components.main.confirm.active = false;
                }
            },
            function(error){
                console.log(error);
                BUTO.components.main.alert.description.title = "Errores en Nuevo Registro";
                BUTO.components.main.alert.description.text = error.body[0].message;
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            });
        },
        remove: function(id, auto, i){
            var me = this;
            if(auto)
                this.models.clienteEmpleado.remove({
                    delimiters: [
                        me.client.id,
                        id
                    ],
                    params: {}
                },
                function(success){
                    if(me.alterLinkDef.remove.length - 1 === i){
                        me.init(0);
                        BUTO.components.main.confirm.active = false;
                    }
                },
                function(error){
                    console.log(error);
                    BUTO.components.main.alert.description.title = "Errores en Borrado de Registro";
                    BUTO.components.main.alert.description.text = error.body.message;
                    BUTO.components.main.alert.description.ok = "Aceptar";
                    BUTO.components.main.alert.active = true;
                    BUTO.components.main.confirm.active = false;
                });
            else{
                BUTO.components.main.confirm.description.title = "Confirmación de borrado";
                BUTO.components.main.confirm.description.text = "¿Deseas borrar el registro seleccionado?";
                BUTO.components.main.confirm.description.accept = "Aceptar";
                BUTO.components.main.confirm.description.cancel = "Cancelar";
                BUTO.components.main.confirm.active = true;
                BUTO.components.main.confirm.onAccept = function(){
                    me.models.clienteEmpleado.remove({
                        delimiters: [
                            me.client.id,
                            id
                        ],
                        params: {}
                    },
                    function(success){
                        me.init(0);
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
    }
});