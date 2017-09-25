var verTienda = require("./verTienda");
var editarTienda = require("./editarTienda");
module.exports = new Vue({
    data: {
        active: 0,
        grid: null,
        watch: verTienda,
        edit: editarTienda
    },
    methods: {
        init(e){
            var me = this;
            this.mask = e.mask;
            this.watch.models.sucursal = e.sucursal;
            this.watch.models.sucursalHorario = e.sucursalHorario;
            this.edit.models.sucursal = e.sucursal;
            this.edit.models.sucursalHorario = e.sucursalHorario;
            this.grid = new BUTO.requires.modules.mcdatatable({
                id: "tiendasRegistradas",
                head: [
                    {title: "id", hidden: true, input: {type: 'number'}},
                    {title: "nombre", orderable: true, editable: true, searchable: {active: true, type: "filter"}}
                ],
                style: {
                    noText: true,
                    general: [
                        "table",
                        "table-bordered"
                    ],
                    head: [
                        "table-inverse"
                    ],
                    body: [
                        "body-class"
                    ],
                    row: {
                        active: true,
                        styleClass: [
                            "grid-row-customized"
                        ]
                    },
                    highlight: {
                        active: true,
                        styleClass: [
                            "grid-row-highlight-customized"
                        ]
                    },
                    responsive: true,
                    pagination: {
                        rowPerPage: 25
                    },
                    draggable: false,
                },
                webService: {
                    active: true,
                    model: e.sucursal,
                    headers: {
                        currentPage: "x-pagination-current-page",
                        pageCount: "x-pagination-page-count",
                        rowPerPage: "x-pagination-per-page",
                        totalRowCount: "x-pagination-total-count"
                    }
                },
                handlers: {
                    watch: {
                        active: true,
                        type: "template"
                    },
                    add: {
                        active: true,
                        type: "template"
                    },
                    edit: {
                        active: true,
                        type: "template"
                    },
                    remove: {
                        active: true
                    },
                },
                //customHandlers: [
                //    {
                //        active: true,
                //        title: "Rutas",
                //        fullHandler: false,
                //        anchorCellClass: [
                //            "grid-row-anchor-customized"
                //        ],
                //        highlight: true,
                //        glyphiconClass: "glyphicon-briefcase",
                //        handler: function(data){
                //            console.log(data);
                //        }
                //    }
                //],
                templateWatch: function(id, index){
                    me.watch.id = id;
                    me.edit.id = id;
                    me.setView(1);
                },
                templateEdit: function(id, index){
                    me.edit.id = id;
                    me.setView(2);
                },
                //beforeEdit: function(){
                //    BUTO.components.main.loader.loading();
                //},
                beforeRemove: function(data, success){
                    BUTO.components.main.confirm.description.title = data.title;
                    BUTO.components.main.confirm.description.text = data.text;
                    BUTO.components.main.confirm.description.accept = data.accept;
                    BUTO.components.main.confirm.description.cancel = data.cancel;
                    BUTO.components.main.confirm.active = data.active;
                    BUTO.components.main.confirm.onAccept = function(){
                        BUTO.components.main.loader.loading();
                        success();
                        BUTO.components.main.confirm.active = false;
                    };
                },
                //beforeAdd: function(){
                //    BUTO.components.main.loader.loading();
                //},
                //onEdit: function(data, success){
                //    if(!success){
                //        BUTO.components.main.alert.description.title = data.title;
                //        BUTO.components.main.alert.description.text = data.text;
                //        BUTO.components.main.alert.description.ok = data.ok;
                //        BUTO.components.main.alert.active = data.active;
                //    }
                //    BUTO.components.main.loader.loaded();
                //},
                onRemove: function(data){
                    BUTO.components.main.loader.loaded();
                },
                //onAdd: function(data, success){
                //    console.log(data, success);
                //    if(!success){
                //        BUTO.components.main.alert.description.title = data.title;
                //        BUTO.components.main.alert.description.text = data.text;
                //        BUTO.components.main.alert.description.ok = data.ok;
                //        BUTO.components.main.alert.active = data.active;
                //    }
                //    BUTO.components.main.loader.loaded();
                //},
                //onChangeColumns: function(data){
                //    console.log(data);
                //},
                //onDragEnd: function(data){
                //    console.log(data);
                //}
            });
        },
        setView: function(e){
            var me = this;
            if(this.edit.edited === true &&
               this.active === 2){
                BUTO.components.main.confirm.description.title = "Edición de registro";
                BUTO.components.main.confirm.description.text = "Salir de la pantalla de edición provocará perder todos los cambios que se hayan realizado.<br>¿Deseas continuar?";
                BUTO.components.main.confirm.description.accept = "Aceptar";
                BUTO.components.main.confirm.description.cancel = "Cancelar";
                BUTO.components.main.confirm.active = true;
                BUTO.components.main.confirm.onAccept = function(){
                    me.edit.edited = false;
                    me.active = e;
                    Vue.nextTick(function(){
                        if(e === 1)
                            me.watch.init();
                        else if(e === 2)
                            me.edit.init();
                    });
                    BUTO.components.main.confirm.active = false;
                };
            }
            else{
                this.active = e;
                Vue.nextTick(function(){
                    if(e === 1)
                        me.watch.init();
                    else if(e === 2)
                        me.edit.init();
                });
            }
        },
        mask: function(){
            
        }
    }
});