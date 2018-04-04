<template>
  <div>
    <form v-on:submit.prevent action="#" method="POST">
      <div>
        <h1>{{ mainMessage.title }}</h1>
        <h4>{{ mainMessage.subtitle }}</h4>
      </div>
      <div>
        <my-input
        name="username"
        label="Usuario"
        type="text"
        :error="alertMessage !== '' && error !== 1"
        v-on:update="update"></my-input>
        <my-input
        name="password"
        label="Contraseña"
        type="password"
        :error="alertMessage !== '' && error !== 0"
        v-on:update="update"></my-input>
      </div>
      <div v-if="alertMessage !== ''">
        <p><b>{{ alertMessage }}</b></p>
      </div>
      <div>
        <button v-on:click="login()" :class="loading ? 'disabled' : ''" type="button">
          <b>{{ loginMessage }}</b>
        </button>
      </div>
    </form>
    <div>
      <button v.on:click.prevent :class="loading ? 'disabled' : ''" type="button">
        {{ forgottenMessage }}
      </button>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import Input from "./input/Input.vue";
  
  export default {
    components: {
      "my-input": Input
    },
    data: function(){
      return {
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
      };
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
  };
</script>
<style></style>