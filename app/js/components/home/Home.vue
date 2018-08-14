<template>
  <div class="_appstructure__total-container">

    <transition name="_appstructure__modal-fade">
      <loader
      v-show="$store.state.loader.state"
      overlayclass
      message="Cargando...">
      </loader>
    </transition>

    <transition name="_appstructure__modal-fade">
      <alert
      v-show="$store.state.alert.state"
      :title="$store.state.alert.description.title"
      :text="$store.state.alert.description.text"
      :buttons="$store.state.alert.buttons"
      overlayclass
      containerclass>
      </alert>
    </transition>

    <heading
    v-on:logout="logout"
    title="vuejs-appstructure"
    :name="$store.state.profile.name">
    </heading>

    <main-menu
    :menu="menu">
    </main-menu>

    <div class="_appstructure__main-container">
      <b-row>
        <b-col cols="12">
          <main-title
          :title="'Sección <small>' + $route.meta.name + '</small>'">
          </main-title>
        </b-col>
        <b-col cols="12">
          <breadcrumb>
          </breadcrumb>
        </b-col>
      </b-row>
      <b-row class="_appstructure__top-20">
        <b-col cols="12">
          <transition name="_appstructure__slide-fade">
            <router-view></router-view>
          </transition>
        </b-col>
      </b-row>
    </div>

    <foot
    overlayclass
    :text="'&copy; ' + $store.state.year + '. Tecnocen'"></foot>
  </div>
</template>
<script>
  import "./../../../css/style-home.css";
  import loader from "./common/Loader.vue";
  import alert from "./common/Alert.vue";
  import heading from "./common/Header.vue";
  import mainMenu from "./common/Menu.vue";
  import mainTitle from "./common/Title.vue";
  import breadcrumb from "./common/Breadcrumb.vue";
  import foot from "./common/Footer.vue";

  export default {
    components: {
      loader,
      alert,
      heading,
      mainMenu,
      mainTitle,
      breadcrumb,
      foot
    },
    mixins: [],
    directives: {},
    props: {},
    data: function(){
      return {
        menu: [
          {
            title: "Inicio",
            path: "dashboard"
          },
          {
            title: "Test",
            path: "test"
          }
        ]
      };
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      logout(){
        this.$store.commit("logout", { finish: true });
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
  }
</script>
<style scoped>
  div._appstructure__main-container{
    background-image: radial-gradient( #ffffff, #f9f9f9 );
  }
  @media (min-width: 576px){
    div._appstructure__main-container{
      margin-left: 240px;
      padding: 30px 25px 30px 25px;
      min-height: calc(100% - 112px);
    }
  }
  @media (max-width: 576px) {
    div._appstructure__main-container{
      padding: 0px 15px 30px 15px;
      min-height: calc(100% - 150px);
    }
  }
  ._appstructure__total-container{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  ._appstructure__modal-overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
