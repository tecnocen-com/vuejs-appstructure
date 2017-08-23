module.exports = new Vue({
    data: {
        client: {
            id: null,
            name: null
        },
        data: {
            perPage: 10,
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
        init: function(e){
            var me = this;
            if(e === 0 || e === 1){             //0 all, 1 store, 2 storeLinked
                this.store = [];
                this.models.sucursal.get({
                    params: {
                        "per-page": this.data.perPage,
                        "sort": "nombre"
                    }
                },
                function(success){
                    for(var i in success.body)
                        me.initStore(success.body[i]);
                    if(e === 0){
                        me.storeLinked = [];
                        me.models.clienteSucursal.get({
                            delimiters: me.client.id,
                            params: {
                                "per-page": me.data.perPage
                            }
                        },
                        function(success){
                            for(var i in success.body)
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
                        "per-page": this.data.perPage
                    }
                },
                function(success){
                    for(var i in success.body)
                        me.initStoreLinked(success.body[i]);
                },
                function(error){
                    console.log(error);
                });
            }
        },
        initStore: function(e){
            var me = this;
            this.models.clienteSucursal.get({
                delimiters: [
                    me.client.id,
                    e.id
                ]
            },
            function(){
                me.store.push({
                    id: e.id,
                    name: e.nombre,
                    lat: e.lat,
                    lng: e.lng,
                    selected: true
                });
            },
            function(){
                me.store.push({
                    id: e.id,
                    name: e.nombre,
                    lat: e.lat,
                    lng: e.lng,
                    selected: false
                });
            });
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
                    name: success.body.nombre,
                    lat: success.body.lat,
                    lng: success.body.lng
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