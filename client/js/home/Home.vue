<template>
  <div>
    <transition name="slide-fade">
      <loader :active="loader.state" message="Cargando"></loader>
    </transition>
    <transition name="slide-fade">
      <confirm
      :active="confirm.state" 
      :description="confirm.description"
      :accept="accept"
      :close="close"></confirm>
    </transition>
    <transition name="slide-fade">
      <alert
      :active="alert.state" 
      :description="alert.description"
      :close="close"></alert>
    </transition>
    
    <heading :profile="profile"></heading>
    
    <my-menu></my-menu>
    
    <breadcrumb></breadcrumb>
    
    <transition name="slide-fade">
      <router-view
      :open="open"
      :onaccept="onAccept"
      :close="close"></router-view>
    </transition>
    
    <foot :year="year"></foot>
  </div>
</template>
<script>
  import axios from "axios";
  import modelAR from "./plugins/axiosActiveRecord.jsx";
  import Loader from "./common/Loader.vue";
  import Confirm from "./common/Confirm.vue";
  import Alert from "./common/Alert.vue";
  import Header from "./common/Header.vue";
  import Menu from "./common/Menu.vue";
  import Breadcrumb from "./common/Breadcrumb.vue";
  import Footer from "./common/Footer.vue";
  
  export default {
    data: function(){
      return {
        profile: {
          name: "Unknown",
          email: null
        },
        models: {
          profile: null
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
      };
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
      "loader": Loader,
      "confirm": Confirm,
      "alert": Alert,
      "heading": Header,
      "my-menu": Menu,
      "breadcrumb": Breadcrumb,
      "foot": Footer
    },
    created: function(){
      var me = this;
      axios.get("/init-user-data").then(function(userResponse){
        if(userResponse.status === 200 && userResponse.data.success)
          (function(){
            new modelAR({
              baseURL: userResponse.data.baseURL,
              dataURL: userResponse.data.dataURL,
              token: userResponse.data.access_token
            },
            function(dataCreator){
              me.models.profile = new dataCreator("profile");
              me.models.profile.get({},
              function(success){
                me.profile.name = success.data.username;
                me.profile.email = success.data.email;
              },
              function(error){
                console.log(error);
                window.location = "/logout";
              });
            },
            function(error){ console.log(error); });
          })();
        else
          window.location = "/logout";
      });
    },
    mounted: function(){}
  }
</script>
<style></style>