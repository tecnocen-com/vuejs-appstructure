<template>
  <div>
    <transition name="_appstructure__slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import "./../css/style.css";
  import "./../css/animations.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "@fortawesome/fontawesome-free/js/all.min.js";

  export default {
    name: "Index",
    components: {},
    mixins: [],
    directives: {},
    props: {},
    data: function(){
      return {};
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      getToken(){
        return this.$store.state.veza.token.value;
      }
    },
    beforeCreate: function(){},
    created: function(){
      this.$store.dispatch("autoAuth");
    },
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
<style>
  ._appstructure__top-100{
    margin-top: 100px;
  }
  ._appstructure__top-90{
    margin-top: 90px;
  }
  ._appstructure__top-80{
    margin-top: 80px;
  }
  ._appstructure__top-70{
    margin-top: 70px;
  }
  ._appstructure__top-60{
    margin-top: 60px;
  }
  ._appstructure__top-50{
    margin-top: 50px;
  }
  ._appstructure__top-40{
    margin-top: 40px;
  }
  ._appstructure__top-30{
    margin-top: 30px;
  }
  ._appstructure__top-20{
    margin-top: 20px;
  }

  /* Vue Transitions */
  ._appstructure__slide-fade-enter-active {
    -webkit-animation: _appstructure__slide-fade-in 0.5s ease;
    transition: _appstructure__slide-fade-in 0.5s ease;
  }
  @keyframes _appstructure__slide-fade-in {
    0% {
      -ms-transform: translate(5%, 0%);
      -webkit-transform: translate(5%, 0%);
      transform: translate(5%, 0%);
      opacity: 0;
    }
    100% {
      -ms-transform: translate(0%, 0%);
      -webkit-transform: translate(0%, 0%);
      transform: translate(0%, 0%);
      opacity: 1;
    }
  }

  ._appstructure__modal-fade-enter-active {
    -webkit-animation: _appstructure__modal-fade-in 0.5s ease;
    transition: _appstructure__modal-fade-in 0.5s ease;
  }
  ._appstructure__modal-fade-leave-active {
    -webkit-animation: _appstructure__modal-fade-in 0.5s reverse;
    animation: _appstructure__modal-fade-in 0.5s reverse;
  }
  @keyframes _appstructure__modal-fade-in {
    0% {
      -ms-transform: rotate(10deg);
      -webkit-transform: rotate(10deg);
      transform: rotate(10deg);
      opacity: 0;
    }
    100% {
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: 1;
    }
  }
</style>
