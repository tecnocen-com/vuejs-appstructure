BUTO.requires = {
    modules: {
        modelAR: require("./plugins/modelAR.js"),
        mapsClient: require("@google/maps")
    },
    templates: {
        main: require("./mainT.js")
    },
    components: {
        toolbar: require("./component/toolbar.js"),
        map: require("./component/map.js"),
        menu: require("./component/common/menu.js"),
    }
};

Vue.http.get("/init-user-data").then(function(userResponse){
    if(userResponse.status === 200 && userResponse.body.success){
        BUTO.init(userResponse);
        (function(){
            new BUTO.requires.modules.modelAR({
                baseURL: userResponse.body.baseURL,
                dataURL: userResponse.body.dataURL,
                token: userResponse.body.access_token
                
                //baseURL: "https://alquimia3.adelantoad.com/index.php/api/",
                //tokenURL: "oauth2/token",
                //dataURL: "v1/",
                //contentType: "application/x-www-form-urlencoded",
                //accessData: {
                //    headers: {
                //        Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",   //username: testclient || password: testpass
                //    },
                //    body: {
                //        grant_type:"password", 
                //        username:"administrador", 
                //        password:"acceso_7h8j9k0l!!"
                //    }
                //}
            },
            function(modelCreator){
                BUTO.components = {
                    main: new Vue({
                        el: "#main",
                        template: BUTO.requires.templates.main,
                        data: {
                            active: {
                                first: 0,
                                second: 0,
                                third: 0
                            },
                            children: {
                                map: BUTO.requires.components.map,
                                toolbar: BUTO.requires.components.toolbar,
                                menu: BUTO.requires.components.menu
                            }
                        },
                        methods: {
                            setView: function(e){
                                var me = this;
                                this.active.first = e.first;
                                this.active.second = e.second;
                                this.active.third = e.third;
                                if(this.active.first === 0 &&
                                   this.active.second === 0 &&
                                   this.active.third === 0)
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
            },
            function(error){
                console.log(error);
            });
        })();
    }
    else{
        window.location = "/logout";
    }
});
BUTO.init = function(response){
    BUTO.requires.components.map.token = response.body.apiKey;
    BUTO.requires.components.map.mapsClient = BUTO.requires.modules.mapsClient.createClient({
        key: response.body.apiKey
    });
};