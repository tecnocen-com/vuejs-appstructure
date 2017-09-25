var verRecurso = require("./verRecurso");
var editarRecurso = require("./editarRecurso");
var rutas = require("./rutas");
module.exports = new Vue({
    data: {
        active: 0,
        grid: null,
        watch: verRecurso,
        edit: editarRecurso,
        ruta: rutas,
        models: {
            usuario: null,
            empleado: null
        },
        remove: {
            type: false, //FALSE remove only schedules, TRUE remove all user
            id: null,
            name: null
        }
    },
    methods: {
        init(e){
            var me = this;
            this.mask = e.mask;
            this.models.usuario = e.usuario;
            this.models.empleado = e.empleado;
            
            this.watch.models.usuarioEmpleado = e.usuarioEmpleado;
            this.watch.models.empleado = e.empleado;
            this.watch.models.empleadoHorario = e.empleadoHorario;
            
            this.edit.models.usuarioEmpleado = e.usuarioEmpleado;
            this.edit.models.empleado = e.empleado;
            this.edit.models.empleadoHorario = e.empleadoHorario;
            
            this.ruta.models.empleadoHorario = e.empleadoHorario;
            this.ruta.models.ruta = e.ruta;
            this.ruta.models.rutaPunto = e.rutaPunto;
            this.ruta.models.rutaPuntoServicio = e.rutaPuntoServicio;
            this.ruta.models.sucursal = e.sucursal;
            this.ruta.models.sucursalHorario = e.sucursalHorario;
            this.ruta.models.sucursalCliente = e.sucursalCliente;
            this.ruta.models.proyeccionServicio = e.proyeccionServicio;
            this.ruta.models.proyeccionTrabajo = e.proyeccionTrabajo;
            this.ruta.models.proyeccionTrabajoServicio = e.proyeccionTrabajoServicio;
            
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
                        active: false
                    },
                },
                customHandlers: [
                    {
                        active: true,
                        title: "Rutas",
                        fullHandler: false,
                        anchorCellClass: [
                            ""
                        ],
                        highlight: true,
                        glyphiconClass: "glyphicon-road",
                        handler: function(data){
                            me.ruta.client.id = data.id;
                            me.ruta.client.name = data.nombre;
                            me.setView(3);
                        }
                    },
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
                            me.remove.id = data.id;
                            me.remove.name = data.nombre;
                            me.remove.type = false;
                            $("#remove").modal("show");
                            //me.removeEmployee();
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
        setView: function(e, confirm){
            var me = this;
            if(this.edit.edited === true &&
               this.active === 2){
                BUTO.components.main.confirm.description.title = "Edición de registro";
                BUTO.components.main.confirm.description.text = "Salir de la pantalla de edición provocará perder todos los cambios realizados.<br>¿Deseas continuar?";
                BUTO.components.main.confirm.description.accept = "Aceptar";
                BUTO.components.main.confirm.description.cancel = "Cancelar";
                BUTO.components.main.confirm.active = true;
                BUTO.components.main.confirm.onAccept = function(){
                    me.edit.edited = false;
                    me.active = e;
                    if(e === 3)
                        me.ruta.init(0, 1);
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
                if(e === 3)
                    this.ruta.init(0, 1);
                Vue.nextTick(function(){
                    if(e === 1)
                        me.watch.init();
                    else if(e === 2)
                        me.edit.init();
                });
            }
        },
        mask: function(){
            
        },
        removeEmployee: function(){
            var me = this;
            BUTO.components.main.confirm.description.title = "Confirmación de borrado";
            BUTO.components.main.confirm.description.text = "¿Deseas borrar el registro seleccionado?";
            BUTO.components.main.confirm.description.accept = "Aceptar";
            BUTO.components.main.confirm.description.cancel = "Cancelar";
            BUTO.components.main.confirm.active = true;
            BUTO.components.main.confirm.onAccept = function(){
                if(me.remove.type)        //ALL
                    me.models.usuario.remove({
                        delimiters: me.remove.id,
                        params: {}
                    },
                    function(success){
                        document.getElementById("closeRemoveEmployee").click();
                        BUTO.components.main.confirm.active = false;
                        me.grid.updatePagination();
                    },
                    function(error){
                        console.log(error);
                        BUTO.components.main.alert.description.title = "Errores en Borrado de Registro";
                        BUTO.components.main.alert.description.text = error.body.message;
                        BUTO.components.main.alert.description.ok = "Aceptar";
                        BUTO.components.main.alert.active = true;
                    });
                else                        //Only field info
                    me.models.empleado.remove({
                        delimiters: me.remove.id,
                        params: {}
                    },
                    function(success){
                        document.getElementById("closeRemoveEmployee").click();
                        BUTO.components.main.confirm.active = false;
                        me.grid.updatePagination();
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