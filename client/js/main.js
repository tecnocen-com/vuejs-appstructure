BUTO.requires = {
    modules: {
        mapsClient: require("@google/maps"),
        BootstrapVue: require('bootstrap-vue')
    },
    templates: {
        main: require("./mainT.js")
    },
    components: {
        toolbar: require("./component/toolbar.js"),
        map: require("./component/map.js")
    }
    
};
Vue.use(BUTO.requires.modules.BootstrapVue);
Vue.http.get("/api-key").then(function(response){
    BUTO.init(response);
    BUTO.components = {
        main: new Vue({
            el: "#main",
            template: BUTO.requires.templates.main,
            data: {
                active: {
                    first: 0,
                    second: 0
                },
                children: {
                    map: BUTO.requires.components.map,
                    toolbar: BUTO.requires.components.toolbar
                }
            },
            methods: {
                setView(e){
                    var me = this;
                    this.active.first = e.first;
                    this.active.second = e.second;
                    if(this.active.first === 0 &&
                       this.active.second === 0)
                        Vue.nextTick(function(){
                            me.children.map.init();
                        });
                }
            },
            mounted: function(){
                this.children.map.init();
            }
        })
    };
});
BUTO.init = function(response){
    BUTO.requires.components.map.token = response.body.apiKey;
    BUTO.requires.components.map.mapsClient = BUTO.requires.modules.mapsClient.createClient({
        key: response.body.apiKey
    });
};