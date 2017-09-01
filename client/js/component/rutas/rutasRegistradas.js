var verRuta = require("./verRuta");
var editarRuta = require("./editarRuta");
module.exports = new Vue({
    data: {
        active: 0,
        grid: null,
        watch: verRuta,
        edit: editarRuta
    },
    methods: {
        init(e){
            var me = this;
            this.mask = e.mask;
            this.watch.models.ruta = e.ruta;
            this.watch.models.rutaPunto = e.rutaPunto;
            this.watch.models.rutaPuntoServicio = e.rutaPuntoServicio;
            this.edit.models.ruta = e.ruta;
            this.edit.models.rutaPunto = e.rutaPunto;
            this.edit.models.rutaPuntoServicio = e.rutaPuntoServicio;
            this.grid = new BUTO.requires.modules.mcdatatable({
                id: "rutasRegistradas",
                head: [
                    {title: "id", hidden: true, input: {type: 'number'}},
                    {title: "nombre", input: {type: 'text'}, editable: true, orderable: true, searchable: {active: true, type: "filter"}},
                    {
                        title: "dia",
                        input: {
                            type: 'select',
                            options:[
                                {
                                    text: "Domingo",
                                    value: 1
                                },
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
                                }
                            ]
                        },
                        editable: true,
                        orderable: true,
                        searchable: {
                            active: true,
                            type: "status"
                            }
                        },
                    {title: "hora_inicio", input: {type: 'email'}, editable: true, orderable: true, searchable: {active: false, type: "filter"}},
                    {title: "hora_fin", input: {type: 'email'}, editable: true, orderable: true, searchable: {active: false, type: "filter"}}
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
                    model: e.ruta,
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
                        active: false
                    },
                },
                customHandlers: [
                    {
                        active: true,
                        title: "Eliminar usuario",
                        fullHandler: false,
                        anchorCellClass: [
                            ""
                        ],
                        highlight: true,
                        glyphiconClass: "glyphicon-remove",
                        handler: function(data){
                            console.log(data);
                        }
                    }
                ],
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