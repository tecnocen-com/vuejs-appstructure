BUTO.template = require("./indexT.js");
BUTO.component = new Vue({
  el: "#index",
  template: BUTO.template.index,
  data: {
    hidden: true,
    error: 0,
    
    mainMessage: {
      title: "Bienvenido",
      subtitle: "Ingrese a su cuenta"
    },
    
    loading: false,
    loginMessage: "Continuar",
    forgottenMessage: "¿Olvidaste tu contraseña?",
    
    alertMessage: "",
    
    username: "",
    password: ""
  },
  components: {
    "my-input": require("./input/input.js")
  },
  methods: {
    update: function(o, key){
      for(var i in o)
        this[i] = o[i];
      if(key === 13)
        this.login();
    },
    login: function(){
      var me = this,
        validator = this.username === "" ? 0 : 
        this.password === "" ? 1 : 2;
      switch(validator){
        case 0:
          this.error = 0;
          this.alertMessage = "Error, se requiere un nombre de usuario.";
          setTimeout(function(){ me.alertMessage = ""; }, 1500);
          break;
        case 1:
          this.error = 1;
          this.alertMessage = "Error, se requiere una contraseña.";
          setTimeout(function(){ me.alertMessage = ""; }, 1500);
          break;
        default:
          this.loading = true;
          axios.post("/login", {
            user: this.username,
            pass: this.password
          }).then(function(response){
            if(response.status === 200 && response.data.status !== 401)
              window.location = "/";
            else{
              me.error = 2;
              me.alertMessage = "Error, nombre de usuario y/o contraseña inválidos.";
              me.loading = false;
              setTimeout(function(){ me.alertMessage = ""; }, 1500);
            }
          });
          break;
      }
    }
  },
  created: function(){},
  mounted: function(){
    this.hidden = false;
  }
});
