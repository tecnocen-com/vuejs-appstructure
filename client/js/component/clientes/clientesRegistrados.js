var tiendasLigadas = require("./tiendasLigadas");
var recursosLigados = require("./recursosLigados");
module.exports = new Vue({
    data: {
        active: 0,
        grid: null,
        tienda: tiendasLigadas,
        recurso: recursosLigados
    },
    methods: {
        init: function(e){
            var me = this;
            this.mask = e.mask;
            this.tienda.models.clienteSucursal = e.clienteSucursal;
            this.tienda.models.sucursal = e.sucursal;
            this.tienda.models.sucursalHorario = e.sucursalHorario;
            
            this.recurso.models.clienteEmpleado = e.clienteEmpleado;
            this.recurso.models.usuarioEmpleado = e.usuarioEmpleado;
            this.recurso.models.empleado = e.empleado;
            this.recurso.models.empleadoHorario = e.empleadoHorario;
            
            this.grid = new BUTO.requires.modules.mcdatatable({
                id: "clientesRegistrados",
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
                    model: e.cliente,
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
                        type: "modal"
                    },
                    add: {
                        active: true,
                        type: "modal"
                    },
                    edit: {
                        active: true,
                        type: "modal"
                    },
                    remove: {
                        active: true
                    },
                },
                customHandlers: [
                    {
                        active: true,
                        title: "Tiendas",
                        fullHandler: false,
                        anchorCellClass: [
                            ""
                        ],
                        highlight: true,
                        glyphiconClass: "glyphicon-tags",
                        handler: function(data){
                            me.tienda.client.id = data.id;
                            me.tienda.client.name = data.nombre;
                            me.recurso.client.id = data.id;
                            me.recurso.client.name = data.nombre;
                            me.setView(1);
                        }
                    },
                    {
                        active: true,
                        title: "Recursos humanos",
                        fullHandler: false,
                        anchorCellClass: [
                            ""
                        ],
                        highlight: true,
                        glyphiconClass: "glyphicon-briefcase",
                        handler: function(data){
                            me.tienda.client.id = data.id;
                            me.tienda.client.name = data.nombre;
                            me.recurso.client.id = data.id;
                            me.recurso.client.name = data.nombre;
                            me.setView(2);
                        }
                    }
                ],
                templateEdit: function(id, index){
                    console.log(id, index);
                },
                beforeEdit: function(){
                    BUTO.components.main.loader.loading();
                },
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
                beforeAdd: function(){
                    BUTO.components.main.loader.loading();
                },
                onEdit: function(data, success){
                    if(!success){
                        BUTO.components.main.alert.description.title = data.title;
                        BUTO.components.main.alert.description.text = data.text;
                        BUTO.components.main.alert.description.ok = data.ok;
                        BUTO.components.main.alert.active = data.active;
                    }
                    BUTO.components.main.loader.loaded();
                },
                onRemove: function(data){
                    BUTO.components.main.loader.loaded();
                },
                onAdd: function(data, success){
                    if(!success){
                        BUTO.components.main.alert.description.title = data.title;
                        BUTO.components.main.alert.description.text = data.text;
                        BUTO.components.main.alert.description.ok = data.ok;
                        BUTO.components.main.alert.active = data.active;
                    }
                    BUTO.components.main.loader.loaded();
                },
                onChangeColumns: function(data){
                    console.log(data);
                },
                onDragEnd: function(data){
                    console.log(data);
                }
            });
        },
        setView: function(e){
            var me = this;
            this.active = e;
            if(e === 1)
                me.tienda.init(0, 1, 1);
            else if(e === 2)
                me.recurso.init(0, 1, 1);
        },
        mask: function(){}
    }
});