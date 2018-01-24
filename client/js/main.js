BUTO.requires = {
  mainTemplate: require("./mainT.js"),
  modules: {
    modelAR: require("./plugins/modelAR.js")
  },
  components: {
    menu: require("./component/common/menu.js"),
    
    dashboard: require("./component/dashboard/dashboard.js"),
    test: require("./component/test/test.js")
  }
};

Vue.http.get("/init-user-data").then(function(userResponse){
  if(userResponse.status === 200 && userResponse.body.success){
    (function(){
      new BUTO.requires.modules.modelAR({
        baseURL: userResponse.body.baseURL,
        dataURL: userResponse.body.dataURL,
        token: userResponse.body.access_token
      },
      function(dataCreator){
        BUTO.components = {
          main: new Vue({
            el: "#main",
            template: BUTO.requires.mainTemplate,
            data: {
              profile: {
                name: "Unknown",
                email: null
              },
              active: {
                first: 0,
                second: 0,
                third: 0
              },
              loader: new Vue({
                data: {
                  active: false,
                  message: "Cargando"
                },
                methods: {
                  loading(){
                    this.active = true;
                  },
                  loaded(){
                    this.active = false;
                  }
                }
              }),
              confirm: new Vue({
                data: {
                  description: {
                    title: "",
                    text: "",
                    accept: "",
                    cancel: ""
                  },
                  active: false
                },
                methods: {
                  onAccept: function(){}
                }
              }),
              alert: new Vue({
                data: {
                  description: {
                    title: "",
                    text: "",
                    ok: ""
                  },
                  active: false
                }
              }),
              models: {
                profile: new dataCreator("profile")
              },
              children: {
                menu: BUTO.requires.components.menu,
                dashboard: BUTO.requires.components.dashboard,
                test: BUTO.requires.components.test
              }
            },
            methods: {
              setView: function(e){
                var me = this,
                  inPos = false;
                if(this.active.first === e.first &&
                this.active.second === e.second &&
                this.active.third === e.third)
                  inPos = true;
                if(!inPos){
                  me.active.first = e.first;
                  me.active.second = e.second;
                  me.active.third = e.third;
                }
              },
            },
            created: function(){
              var me = this;
              this.models.profile.get({},
              function(success){
                me.profile.name = success.body.username;
                me.profile.email = success.body.email;
              },
              function(error){
                console.log(error);
                window.location = "/logout";
              });
            },
            mounted: function(){
              
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