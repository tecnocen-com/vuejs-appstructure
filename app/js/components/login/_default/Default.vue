<template>
  <div :class="$props.overlayclass ? $props.overlayclass : '_appstructure__background-container'">
    <slot>
      <b-container>
        <b-row>
          <b-col sm="12" class="text-center">
            <div class="_appstructure__login-container">
              <b-container>
                <b-row>
                  <b-col sm="12" class="_appstructure__top-30">
                    <div class="_appstructure__login-header">
                      <h2>vuejs-appstructure</h2>
                      <h3><small>Ingresa tus datos para continuar</small></h3>
                    </div>
                  </b-col>
                  <b-col sm="12">
                    <div class="_appstructure__login-body">
                      <b-row>
                        <b-col sm="12" class="_appstructure__top-20 text-left">
                          <label
                          :class="{'_appstructure__wrong': errormessage !== '' && valid !== 1}"
                          for="username">Usuario:</label>
                          <b-input
                          v-on:keydown.native.space.prevent
                          v-on:keydown.native.enter="validate()"
                          v-model="username"
                          :class="{'_appstructure__wrong': errormessage !== '' && valid !== 1}"
                          class="_appstructure__login-input"
                          id="username"
                          ref="username"
                          maxlength="64">
                          </b-input>
                        </b-col>
                        <b-col sm="12" class="_appstructure__top-20 text-left">
                          <label
                          :class="{'_appstructure__wrong': errormessage !== '' && valid !== 0}"
                          for="password">Contraseña:</label>
                          <b-input
                          v-on:keydown.native.space.prevent
                          v-on:keydown.native.enter="validate()"
                          v-model="password"
                          :class="{'_appstructure__wrong': errormessage !== '' && valid !== 0}"
                          class="_appstructure__login-input"
                          id="password"
                          ref="password"
                          type="password"
                          maxlength="64">
                          </b-input>
                        </b-col>
                      </b-row>
                      <div :class="{'active': errormessage !== ''}" class="_appstructure__error _appstructure__top-20">
                        <p>{{ errormessage }}</p>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12">
                    <div class="_appstructure__login-footer">
                      <b-button v-on:click="validate()" :disabled="loading" size="lg" variant="outline-warning" block>
                        <span v-show="loading"><i class="fa fa-spin fa-spinner"></i></span>
                        Iniciar sesión
                      </b-button>
                      <b-button :disabled="loading" size="sm" variant="outline-warning" class="_appstructure__recover float-right">
                        ¿Olvidaste tu contraseña?
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </slot>
  </div>
</template>
<script>
  export default {
    components: {},
    mixins: [],
    directives: {},
    props: {
      overlayclass: String,
      loading: Boolean,

      errormessage: String,
      valid: Number
    },
    data: function(){
      return {
        username: null,
        password: null
      };
    },
    computed: {},
    watch: {
      username: function(){
        this.press();
      },
      password: function(){
        this.press();
      }
    },
    filters: {},
    methods: {
      press(){
        this.$emit("update", {
          username: this.username,
          password: this.password
        });
      },
      validate(){
        this.$emit("validate");
      },
      setAuth(){
        this.$emit("setAuth");
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
<style scoped>
  @media (min-height: 540px) {
    div._appstructure__background-container{
      position: fixed;
    }
  }
  div._appstructure__background-container{
    width: 100%;
    height: 100%;
    background: url(./../../../../image/background.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  div._appstructure__login-container{
    margin-top: 5%;
    min-height: 450px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 20px;
    border-top-left-radius: 15px;
    background-color: rgba(255, 255, 255, 0.65);
    box-shadow: 10px 10px 5px 5px rgba(0, 0, 0, 0.6);
    border-bottom-right-radius: 15px;
  }

  div._appstructure__login-container div._appstructure__login-header{
    background: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 193, 7), rgba(255, 255, 255, 0));
    padding-bottom: 5px;
    margin-left: -15px;
    margin-right: -15px;
    color: #d8d8d8;
    text-shadow: 3px 3px 5px #2f2f2f;
  }

  div._appstructure__login-container div._appstructure__login-body input._appstructure__login-input{
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    border-left: 6px solid rgb(255, 193, 7);
  }
  div._appstructure__login-container div._appstructure__login-body input._appstructure__login-input._appstructure__wrong{
    border-left: 6px solid rgb(250, 12, 20);
    border-bottom: 2px solid rgb(250, 12, 20);
  }
  div._appstructure__login-container div._appstructure__login-body label{
    color: rgb(255, 193, 7);
    text-shadow: 3px 3px 5px #000000;
    font-weight: bold;
  }
  div._appstructure__login-container div._appstructure__login-body label._appstructure__wrong{
    color: rgb(250, 12, 20);
  }
  div._appstructure__login-container div._appstructure__login-body div._appstructure__error{
    color: rgb(250, 12, 20);
    text-shadow: 1px 1px 2px #000000;
    opacity: 0;
    -webkit-animation: opacity 0.5s ease;
    transition: opacity 0.5s ease;
  }
  div._appstructure__login-container div._appstructure__login-body div._appstructure__error.active{
    opacity: 1;
  }

  div._appstructure__login-container div._appstructure__login-footer button{
    text-shadow: 1px 1px 2px #000000;
  }
  div._appstructure__login-container div._appstructure__login-footer button._appstructure__recover{
    margin-top: 20px;
    border-width: 0px 0px 1px 0px;
  }
  div._appstructure__login-container div._appstructure__login-footer button._appstructure__recover:hover,
  div._appstructure__login-container div._appstructure__login-footer button._appstructure__recover:active,
  div._appstructure__login-container div._appstructure__login-footer button._appstructure__recover:focus{
    background-color: rgba(255, 193, 7, 0);
    box-shadow: none;
  }
</style>
