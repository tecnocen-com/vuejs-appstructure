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
    user: {
      data: "",
      label: "Usuario"
    },
    password: {
      data: "",
      label: "Contraseña"
    },
    alert: {
      hidden: true,
      message: ""
    },
    button: {
      loading: false,
      login: {
        message: "Continuar"
      },
      forgotten: {
        message: "¿Olvidaste tu contraseña?"
      }
    }
  },
  methods: {
    login: function(){
      var me = this,
        validator;
      this.button.loading = true;
      validator = this.user.data === "" ? 0 : 
      this.password.data === "" ? 1 : 2;
      switch(validator){
        case 0:
          this.button.loading = false;
          this.error = 0;
          this.alert.hidden = false;
          this.alert.message = "Error, se requiere un nombre de usuario.";
          setTimeout(function(){ me.alert.hidden = true; }, 1500);
          break;
        case 1:
          this.button.loading = false;
          this.error = 1;
          this.alert.hidden = false;
          this.alert.message = "Error, se requiere una contraseña.";
          setTimeout(function(){ me.alert.hidden = true; }, 1500);
          break;
        default:
          axios.post("/login", {
            user: this.user.data,
            pass: this.password.data
          }).then(function(response){
            if(response.status === 200 && response.data.status !== 401){
              window.location = "/";
            }
            else{
              me.alert.message = "Error, nombre de usuario y/o contraseña inválidos.";
              me.alert.hidden = false;
              me.error = 2;
              me.button.loading = false;
              setTimeout(function(){ me.alert.hidden = true; }, 1500);
            }
          });
          break;
      }
    }
  },
  created: function(){
    
  },
  mounted: function(){
    this.hidden = false;
    this.$refs.username.autofocus = true;
  }
});
