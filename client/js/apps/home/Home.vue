<template>
  <div>
    <transition name="slide-fade">
      <loader message="Cargando"></loader>
    </transition>
    <transition name="slide-fade">
      <confirm></confirm>
    </transition>
    <transition name="slide-fade">
      <alert></alert>
    </transition>

    <heading></heading>

    <my-menu></my-menu>

    <breadcrumb></breadcrumb>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

    <foot></foot>
  </div>
</template>
<script>
  import axios from "axios";
  import modelAR from "../../plugins/axiosActiveRecord.jsx";
  import Loader from "./components/common/Loader.vue";
  import Confirm from "./components/common/Confirm.vue";
  import Alert from "./components/common/Alert.vue";
  import Header from "./components/common/Header.vue";
  import Menu from "./components/common/Menu.vue";
  import Breadcrumb from "./components/common/Breadcrumb.vue";
  import Footer from "./components/common/Footer.vue";

  export default {
    components: {
      "loader": Loader,
      "confirm": Confirm,
      "alert": Alert,
      "heading": Header,
      "my-menu": Menu,
      "breadcrumb": Breadcrumb,
      "foot": Footer
    },
    data: function(){
      return {};
    },
    methods: {},
    created: function(){
      axios.get("/init-user-data").then(userResponse => {
        if(userResponse.status === 200 && userResponse.data.success)
          (() => {
            new modelAR({
              baseURL: userResponse.data.baseURL,
              dataURL: userResponse.data.dataURL,
              token: userResponse.data.access_token
            },
            dataCreator => {
              this.$store.state.models.profile = new dataCreator("profile");
              this.$store.state.models.profile.get({},
              success => {
                this.$store.commit("setProfile", {
                  name: success.data.username,
                  email: success.data.email
                });
              },
              error => {
                console.log(error);
                window.location = "/logout";
              });
            },
            error => console.log(error));
          })();
        else
          window.location = "/logout";
      });
    },
    mounted: function(){}
  }
</script>
<style></style>
