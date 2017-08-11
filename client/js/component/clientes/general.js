module.exports = new Vue({
    data: {
        models: {
            cliente: null,
            clienteEmpleado: null,
            clienteSucursal: null
        },
        grid: null
    },
    methods: {
        init(e){
            this.models.cliente = e.cliente;
            this.models.clienteEmpleado = e.clienteEmpleado;
            this.models.clienteSucursal = e.clienteSucursal;
            this.grid = new BUTO.requires.modules.mcdatatable({
            id: "cliente",
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
                    active: false,
                    //styleClass: [
                    //    "grid-row-customized"
                    //]
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
                    currentPage: "X-Pagination-Current-Page",
                    pageCount: "X-Pagination-Page-Count",
                    rowPerPage: "X-Pagination-Per-Page",
                    totalRowCount: "X-Pagination-Total-Count"
                }
            },
            handlers: {
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
                    title: "Rutas",
                    fullHandler: false,
                    anchorCellClass: [
                        "grid-row-anchor-customized"
                    ],
                    highlight: true,
                    glyphiconClass: "glyphicon-briefcase",
                    handler: function(data){
                        console.log(data);
                    }
                }
            ],
            templateEdit: function(id, index){
                console.log(id, index);
            },
            beforeEdit: function(){
                console.log("A");
                //BUTO.components.main.loader.loading();
            },
            beforeRemove: function(data, success){
                console.log(data, success);
                //BUTO.components.main.confirm.description.title = data.title;
                //BUTO.components.main.confirm.description.text = data.text;
                //BUTO.components.main.confirm.description.accept = data.accept;
                //BUTO.components.main.confirm.description.cancel = data.cancel;
                //BUTO.components.main.confirm.active = data.active;
                //BUTO.components.main.confirm.onAccept = function(){
                //    BUTO.components.main.loader.loading();
                //    success();
                //    BUTO.components.main.confirm.active = false;
                //};
            },
            beforeAdd: function(){
                console.log("B");
                //BUTO.components.main.loader.loading();
            },
            onEdit: function(data, success){
                console.log(data, success);
                //if(success){
                //    var postData = {
                //        idUser: BUTO.components.main.header.userData.idUser,
                //        username: BUTO.components.main.header.userData.username,
                //        idData: data.id
                //    };
                //    socket.emit('editEmpresa', postData);
                //}
                //else{
                //    BUTO.components.main.alert.description.title = data.title;
                //    BUTO.components.main.alert.description.text = data.text;
                //    BUTO.components.main.alert.description.ok = data.ok;
                //    BUTO.components.main.alert.active = data.active;
                //}
                //BUTO.components.main.loader.loaded();
            },
            onRemove: function(data){
                console.log(data);
                //var postData = {
                //    idUser: BUTO.components.main.header.userData.idUser,
                //    username: BUTO.components.main.header.userData.username,
                //    idData: data.id
                //};
                //socket.emit('deleteEmpresa', postData);
                //BUTO.components.main.loader.loaded();
            },
            onAdd: function(data, success){
                console.log(data, success);
                //if(success){
                //    var postData = {
                //        idUser: BUTO.components.main.header.userData.idUser,
                //        username: BUTO.components.main.header.userData.username
                //    };
                //    socket.emit('addEmpresa', postData);
                //}
                //else{
                //    BUTO.components.main.alert.description.title = data.title;
                //    BUTO.components.main.alert.description.text = data.text;
                //    BUTO.components.main.alert.description.ok = data.ok;
                //    BUTO.components.main.alert.active = data.active;
                //}
                //BUTO.components.main.loader.loaded();
            },
            onChangeColumns: function(data){
                console.log(data);
                //BUTO.components.main.loader.loading();
                //var postData = {
                //    update: {
                //        updateData: {
                //            "gridConfig.empresa.visibility": data
                //        },
                //        updateTable: "user",
                //        flag: true
                //    }
                //};
                //this.$http.post("/data-handler", postData).then(function(response){
                //    if(response.body.success){
                //        BUTO.components.main.loader.loaded();
                //    }
                //    else{
                //        BUTO.components.main.loader.loaded();
                //        BUTO.components.main.alert.description.title = "Edición de Configuración de Tablas";
                //        BUTO.components.main.alert.description.text = "Ha ocurrido un error. Inténtalo de nuevo más tarde.";
                //        BUTO.components.main.alert.description.ok = "Aceptar";
                //        BUTO.components.main.alert.active = true;
                //    }
                //});
            },
            onDragEnd: function(data){
                console.log(data);
                //BUTO.components.main.loader.loading();
                //var postData = {
                //    update: {
                //        updateData: {
                //            "gridConfig.empresa.order": data
                //        },
                //        updateTable: "user",
                //        flag: true
                //    }
                //};
                //this.$http.post("/data-handler", postData).then(function(response){
                //    if(response.body.success){
                //        BUTO.components.main.loader.loaded();
                //    }
                //    else{
                //        BUTO.components.main.loader.loaded();
                //        BUTO.components.main.alert.description.title = "Edición de Configuración de Tablas";
                //        BUTO.components.main.alert.description.text = "Ha ocurrido un error. Inténtalo de nuevo más tarde.";
                //        BUTO.components.main.alert.description.ok = "Aceptar";
                //        BUTO.components.main.alert.active = true;
                //    }
                //});
            }
        });
        }
    }
});