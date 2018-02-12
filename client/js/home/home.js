BUTO.template = require("./homeT.js");
BUTO.modules = {
  modelAR: require("./plugins/axiosActiveRecord.js")
};

axios.get("/init-user-data").then(function(userResponse){
  if(userResponse.status === 200 && userResponse.data.success)
    (function(){
      new BUTO.modules.modelAR({
        baseURL: userResponse.data.baseURL,
        dataURL: userResponse.data.dataURL,
        token: userResponse.data.access_token
      },
      function(dataCreator){
        BUTO.components = {
          main: new Vue({
            el: "#home",
            template: BUTO.template.home,
            data: {
              profile: {
                name: "Unknown",
                email: null
              },
              models: {
                profile: new dataCreator("profile")
              },
              loader: {
                state: true
              },
              confirm: {
                state: true,
                action: function(){},
                description: {
                  title: "Título de Confirmación",
                  text: "Texto de confirmación",
                  accept: "Aceptar",
                  close: "Cancelar"
                }
              },
              alert: {
                state: true,
                description: {
                  title: "Título de Alerta",
                  text: "Texto de alerta",
                  close: "Aceptar"
                }
              },
              year: 2018
            },
            methods: {
              open: function(){
                if(arguments[0] !== "loader"){
                  this[arguments[0]].description.title = arguments[1].title;
                  this[arguments[0]].description.text = arguments[1].text;
                  this[arguments[0]].description.close = arguments[1].close;
                }
                if(arguments[0] === "confirm")
                  this[arguments[0]].description.accept = arguments[1].accept;
                this[arguments[0]].state = true;
              },
              close: function(){
                this[arguments[0]].state = false;
              },
              onAccept: function(e){
                this.confirm.action = e;
              },
              accept: function(){
                this.confirm.action();
                this.close("confirm");
              }
            },
            components: {
              "loader": require("./common/loader/loader.js"),
              "confirm": require("./common/confirm/confirm.js"),
              "alert": require("./common/alert/alert.js"),
              "heading": require("./common/header/header.js"),
              "my-menu": require("./common/menu/menu.js"),
              "breadcrumb": require("./common/breadcrumb/breadcrumb.js"),
              "foot": require("./common/footer/footer.js")
            },
            router: new VueRouter({
              routes: [
                {
                  title: "Inicio",
                  path: "/",
                  component: BUTO.template.dashboard
                },
                {
                  title: "Test",
                  path: "/test",
                  component: BUTO.template.test
                }
              ]
            }),
            created: function(){
              var me = this;
              this.models.profile.get({},
              function(success){
                me.profile.name = success.data.username;
                me.profile.email = success.data.email;
              },
              function(error){
                console.log(error);
                window.location = "/logout";
              });
            },
            mounted: function(){}
          })
        };
      },
      function(error){ console.log(error); });
    })();
  else
    window.location = "/logout";
});