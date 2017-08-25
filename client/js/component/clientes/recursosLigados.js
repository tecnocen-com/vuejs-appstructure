module.exports = new Vue({
    data: {
        client: {
            id: null,
            name: null
        },
        data: {
            perPage: 30,
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
                    active: 0,  //0 nothing to see, 1 remove, 2 add
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
                name: null,
                time: null
            }
        }
    },
    methods: {
        init: function(e, page, pageLinked){
            var i,
                me = this;
            if(page)
                this.data.page.resource.currentPage = page;
            if(pageLinked)
                this.data.page.resourceLinked.currentPage = pageLinked;
            if(e === 0 || e === 1){             //0 all, 1 resource, 2 resourceLinked
                this.resource = [];
                this.models.sucursal.get({
                    params: {
                        "per-page": this.data.perPage,
                        "sort": "nombre",
                        "page": this.data.page.resource.currentPage,
                        "nombre": this.data.search.resource
                    }
                },
                function(success){
                    me.data.page.resource.pageCount = parseInt(success.headers.map["X-Pagination-Page-Count"][0]);
                    me.data.page.resource.totalCount = parseInt(success.headers.map["X-Pagination-Total-Count"][0]);
                    for(i in success.body)
                        me.initStore(success.body[i]);
                    if(e === 0){
                        me.resourceLinked = [];
                        me.models.clienteSucursal.get({
                            delimiters: me.client.id,
                            params: {
                                "per-page": me.data.perPage,
                                "page": me.data.page.resourceLinked.currentPage,
                                "expand": "sucursal"
                            }
                        },
                        function(success){
                            me.data.page.resourceLinked.pageCount = parseInt(success.headers.map["X-Pagination-Page-Count"][0]);
                            me.data.page.resourceLinked.totalCount = parseInt(success.headers.map["X-Pagination-Total-Count"][0]);
                            for(i in success.body)
                                me.initStoreLinked(success.body[i]);
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
                this.models.clienteSucursal.get({
                    delimiters: this.client.id,
                    params: {
                        "per-page": this.data.perPage,
                        "page": this.data.page.resourceLinked.currentPage,
                        "expand": "sucursal"
                    }
                },
                function(success){
                    me.data.page.resourceLinked.pageCount = parseInt(success.headers.map["X-Pagination-Page-Count"][0]);
                    me.data.page.resourceLinked.totalCount = parseInt(success.headers.map["X-Pagination-Total-Count"][0]);
                    for(i in success.body)
                        me.initStoreLinked(success.body[i]);
                },
                function(error){
                    console.log(error);
                });
            }
        },
        initStore: function(e){
            var me = this,
                length = me.resource.length;
            me.resource.push({
                id: e.id,
                name: e.nombre,
                linked: false,
                selected: false
            });
            this.models.clienteSucursal.get({
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
        initStoreLinked: function(e){
            this.resourceLinked.push({
                id: e.sucursal_id,
                time: e.tiempo_solicitado,
                name: e.sucursal.nombre,
                selected: false
            });
        },
        initDrag: function(type){
            var me = this;
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
        validation: function(type, i){
            var hmd;
            switch(type){
                case "add":
                    hmd = this.alterLinkDef.add[i].time.split(":");
                    this.alterLinkDef.add[i].valid = false;
                    if(this.alterLinkDef.add[i].time === "")
                        this.alterLinkDef.add[i].text = "Tiempo requerido no puede estar vacío";
                    else if(this.alterLinkDef.add[i].time.length !== 8)
                        this.alterLinkDef.add[i].text = "Tiempo requerido no tiene un formato apropiado";
                    else if(this.alterLinkDef.add[i].time > "23:59:59" ||
                    hmd.length !== 3 || hmd[0].length !== 2 || parseInt(hmd[0]) > 23 ||
                    !hmd[1] || hmd[1].length !== 2 || parseInt(hmd[1]) > 59 ||
                    !hmd[2] || hmd[2].length !== 2 || parseInt(hmd[2]) > 59)
                        this.alterLinkDef.add[i].time.text = "Tiempo requerido no tiene un formato apropiado";
                    else{
                        this.alterLinkDef.add[i].text = "hh:mm:ss";
                        this.alterLinkDef.add[i].valid = true;
                    }
                    break;
                case "edit":
                    hmd = this.alterLinkDef.edit.time.split(":");
                    this.alterLinkDef.edit.valid = false;
                    if(this.alterLinkDef.edit.time === "")
                        this.alterLinkDef.edit.text = "Tiempo requerido no puede estar vacío";
                    else if(this.alterLinkDef.edit.time.length !== 8)
                        this.alterLinkDef.edit.text = "Tiempo requerido no tiene un formato apropiado";
                    else if(this.alterLinkDef.edit.time > "23:59:59" ||
                    hmd.length !== 3 || hmd[0].length !== 2 || parseInt(hmd[0]) > 23 ||
                    !hmd[1] || hmd[1].length !== 2 || parseInt(hmd[1]) > 59 ||
                    !hmd[2] || hmd[2].length !== 2 || parseInt(hmd[2]) > 59)
                        this.alterLinkDef.edit.time.text = "Tiempo requerido no tiene un formato apropiado";
                    else{
                        this.alterLinkDef.edit.text = "hh:mm:ss";
                        this.alterLinkDef.edit.valid = true;
                    }
                    break;
            }
        },
        setMasive: function(type){
            var i,
                me = this;
            switch(type){
                case "add":
                    this.alterLinkDef.add = [];
                    for(i = 0; i < this.resource.length; i++)
                        if(this.resource[i].selected === true &&
                           this.resource[i].linked === false)
                            this.setLink(type, i, true); //AUTO
                    $('#add').modal('show');
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
            switch(type){
                case "add":
                    if(!auto)
                        this.alterLinkDef.add = [];
                    this.alterLinkDef.add.push({
                        id: this.resource[i].id,
                        index: i,
                        time: "",
                        valid: true,
                        text: "hh:mm:ss"
                    });
                    break;
                case "edit":
                    this.alterLinkDef.edit.index = i;
                    this.alterLinkDef.edit.name = this.resourceLinked[i].name;
                    this.alterLinkDef.edit.time = this.resourceLinked[i].time;
                    this.alterLinkDef.edit.id = this.resourceLinked[i].id;
                    break;
                case "see":
                    console.log(type, id);
                    break;
                case "seeLinked":
                    this.alterLinkDef.see.name = this.resourceLinked[i].name;
                    this.alterLinkDef.see.time = this.resourceLinked[i].time;
                    break;
            }
        },
        alterLink: function(type){
            var i,
                valid = true;
            switch(type){
                case "add":
                    for(i = 0; i < this.alterLinkDef.add.length; i++){
                        this.validation(type, i);
                        if(this.alterLinkDef.add[i].valid === false)
                            valid = false;
                    }
                    if(valid){
                        for(i = 0; i < this.alterLinkDef.add.length; i++)
                            this.add(this.alterLinkDef.add[i].id, this.alterLinkDef.add[i].time, i);
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
        add: function(id, time, i){
            var me = this;
            this.models.clienteSucursal.post({
                delimiters: this.client.id,
                params: {
                    sucursal_id: id,
                    tiempo_solicitado: time,
                }
            },
            function(success){
                if(me.alterLinkDef.add.length - 1 === i){
                    me.alterLinkDef.add = [];
                    me.init(0);
                    document.getElementById("closeAdd").click();
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
        edit: function(){
            var me = this;
            this.models.clienteSucursal.patch({
                delimiters: [
                    this.client.id,
                    this.alterLinkDef.edit.id
                ],
                params: {
                    tiempo_solicitado: this.alterLinkDef.edit.time,
                }
            },
            function(success){
                me.resourceLinked[me.alterLinkDef.edit.index].time = success.body.tiempo_solicitado;
                document.getElementById("closeEdit").click();
            },
            function(error){
                console.log(error);
                BUTO.components.main.alert.description.title = "Errores en Edición de Registro";
                BUTO.components.main.alert.description.text = error.body[0].message;
                BUTO.components.main.alert.description.ok = "Aceptar";
                BUTO.components.main.alert.active = true;
            });
        },
        remove: function(id, auto, i){
            var me = this;
            if(auto)
                this.models.clienteSucursal.remove({
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
                    me.models.clienteSucursal.remove({
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