module.exports = new Vue({
    data: {
        client: {
            id: null,
            name: null
        },
        data: {
            perPage: 30,
            search: {
                store: "",
                storeLinked: ""
            },
            page: {
                store: {
                    currentPage: 1,
                    pageCount: null,
                    totalCount: null
                },
                storeLinked: {
                    currentPage: 1,
                    pageCount: null,
                    totalCount: null
                }
            }
        },
        models: {
            clienteSucursal: null,
            sucursal: null,
            sucursalHorario: null
        },
        store: [],
        storeLinked: []
    },
    methods: {
        init: function(e, page){
            var i,
                me = this;
            this.data.page.store.currentPage = page;
            if(e === 0 || e === 1){             //0 all, 1 store, 2 storeLinked
                this.store = [];
                this.models.sucursal.get({
                    params: {
                        "per-page": this.data.perPage,
                        "sort": "nombre",
                        "page": this.data.page.store.currentPage,
                        "nombre": this.data.search.store
                    }
                },
                function(success){
                    me.data.page.store.pageCount = parseInt(success.headers.map["X-Pagination-Page-Count"][0]);
                    me.data.page.store.totalCount = parseInt(success.headers.map["X-Pagination-Total-Count"][0]);
                    for(i in success.body)
                        me.initStore(success.body[i]);
                    if(e === 0){
                        me.storeLinked = [];
                        me.models.clienteSucursal.get({
                            delimiters: me.client.id,
                            params: {
                                "per-page": me.data.perPage,
                                "page": me.data.page.storeLinked.currentPage
                            }
                        },
                        function(success){
                            me.data.page.storeLinked.pageCount = parseInt(success.headers.map["X-Pagination-Page-Count"][0]);
                            me.data.page.storeLinked.totalCount = parseInt(success.headers.map["X-Pagination-Total-Count"][0]);
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
                this.storeLinked = [];
                this.models.clienteSucursal.get({
                    delimiters: this.client.id,
                    params: {
                        "per-page": this.data.perPage,
                        "page": this.data.page.storeLinked.currentPage
                    }
                },
                function(success){
                    me.data.page.storeLinked.pageCount = parseInt(success.headers.map["X-Pagination-Page-Count"][0]);
                    me.data.page.storeLinked.totalCount = parseInt(success.headers.map["X-Pagination-Total-Count"][0]);
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
                length = me.store.length;
            me.store.push({
                id: e.id,
                name: e.nombre,
                selected: false
            });
            this.models.clienteSucursal.get({
                delimiters: [
                    me.client.id,
                    e.id
                ]
            },
            function(){
                me.store[length].selected = true;
            },
            function(){});
        },
        initStoreLinked: function(e){
            var me = this;
            this.models.sucursal.get({
                delimiters: e.sucursal_id
            },
            function(success){
                me.storeLinked.push({
                    id: success.body.id,
                    time: e.tiempo_solicitado,
                    name: success.body.nombre
                });
            },
            function(error){
                console.log(error);
            });
        },
        setLink: function(type, id){
            switch(type){
                case "link":
                    
                    break;
                case "unlink":
                    
                    break;
            }
        }
    }
});