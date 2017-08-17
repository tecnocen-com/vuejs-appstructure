module.exports = new Vue({
    data: {
        grid: null
    },
    methods: {
        init(e){
            this.grid = new BUTO.requires.modules.mcdatatable({
            id: "recursosRegistrados",
            head: [
                {title: "id", hidden: true, input: {type: 'number'}},
                {title: "nombre", input: {type: 'text'}, orderable: true, searchable: {active: true, type: "filter"}},
                {title: "correo", input: {type: 'email'}, orderable: true, searchable: {active: true, type: "filter"}}
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
                console.log(id, index);
            },
            templateEdit: function(id, index){
                console.log(id, index);
            },
            //beforeEdit: function(){
            //    BUTO.components.main.loader.loading();
            //},
            beforeRemove: function(data, success){
                console.log(data, success);
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
        }
    }
});