<template>
  <defaultLogin
  v-on:update="update"
  v-on:validate="validate"
  v-on:setAuth="setAuth"
  overlayclass
  :loading="loading"
  :errormessage="errorMessage"
  :valid="valid">
  </defaultLogin>
</template>
<script>
  import "./../../../css/style-login.css";
  import defaultLogin from "./_default/Default.vue";

  export default {
    components: {
      defaultLogin
    },
    mixins: [],
    directives: {},
    props: {},
    data: function(){
      return {
        loading: false,

        params: {
          grant_type: "password",
          username: null,
          password: null
        },

        errorMessage: ""
      };
    },
    computed: {
      valid: function(){
        return this.params.username ? this.params.password ? 2 : 1 : 0;
      }
    },
    watch: {},
    filters: {},
    methods: {
      update(o){
        this.$set(this.params, "username", o.username);
        this.$set(this.params, "password", o.password);
      },
      validate(){
        switch(this.valid){
          case 0:
            this.$set(this, "errorMessage", "Error, se requiere un nombre de usuario.");
            setTimeout(() => this.$set(this, "errorMessage", ""), 1500);
            break;
          case 1:
            this.$set(this, "errorMessage", "Error, se requiere una contraseña.");
            setTimeout(() => this.$set(this, "errorMessage", ""), 1500);
            break;
          default:
            this.setAuth();
            break;
        }
      },
      setAuth(){
        let params;
        Object.keys(this.params).forEach(key => params += `${ params !== "" ? "&": "" }${ key }=${ this.params[key] }`);

        this.$set(this, "loading", true);

        const request = new XMLHttpRequest();
        request.addEventListener("loadend", () => {
          if(request.status === 200){
            this.$set(this.params, "username", null);
            this.$set(this.params, "password", null);
            this.$store.dispatch("manualAuth", { form: request.response.access_token });
          }
          else{
            this.$set(this, "loading", false);
            this.$set(this, "errorMessage", "Error, nombre de usuario y/o contraseña inválidos.");
            setTimeout(() => this.$set(this, "errorMessage", ""), 1500);
          }
        });     //Handle response
        request.responseType = "json";   //Handle response type
        request.open("POST", this.$store.getters.loginUrl, true); // true for asynchronous
        Object.keys(this.$store.state.access.headers).forEach(key => request.setRequestHeader(key, this.$store.state.access.headers[key]));
        request.send(params);                       //Send request
      }
    },
    beforeCreate: function(){},
    created: function(){},
    beforeMount: function(){},
    mounted: function(){},
    beforeUpdate: function(){},
    updated: function(){},
    activated: function(){},
    deactivated: function(){},
    beforeDestroy: function(){},
    destroyed: function(){}
  };
</script>
<style></style>
