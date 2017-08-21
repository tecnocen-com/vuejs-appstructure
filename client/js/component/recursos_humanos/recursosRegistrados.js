var verRecurso = require("./verRecurso");
var editarRecurso = require("./editarRecurso");
module.exports = new Vue({
    data: {
        active: 0,
        grid: null,
        watch: verRecurso,
        edit: editarRecurso
    },
    methods: {
        init(e){
            var me = this;
            this.mask = e.mask;
            this.watch.models.usuarioEmpleado = e.usuarioEmpleado;
            this.watch.models.empleado = e.empleado;
            this.watch.models.empleadoHorario = e.empleadoHorario;
            this.edit.models.usuarioEmpleado = e.usuarioEmpleado;
            this.edit.models.empleado = e.empleado;
            this.edit.models.empleadoHorario = e.empleadoHorario;
            this.grid = new BUTO.requires.modules.mcdatatable({
                id: "recursosRegistrados",
                head: [
                    {title: "id", hidden: true, input: {type: 'number'}},
                    {title: "nombre", input: {type: 'text'}, editable: true, orderable: true, searchable: {active: true, type: "filter"}},
                    {title: "correo", input: {type: 'email'}, editable: true, orderable: true, searchable: {active: true, type: "filter"}}
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
                    model: e.usuarioEmpleado,
                    headers: {
                        currentPage: "X-Pagination-Current-Page",
                        pageCount: "X-Pagination-Page-Count",
                        rowPerPage: "X-Pagination-Per-Page",
                        totalRowCount: "X-Pagination-Total-Count"
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
            this.active = e;
            Vue.nextTick(function(){
                if(e === 1)
                    me.watch.init();
                else if(e === 2)
                    me.edit.init();
            });
        },
        mask: function(){
            
        }
    }
});