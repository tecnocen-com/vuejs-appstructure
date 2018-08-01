<template>
  <div :class="$props.overlayclass ? $props.overlayclass : '_appstructure__modal-overlay _appstructure__loader'">
    <slot>
      <b-container>
        <b-row>
          <b-col md="4"></b-col>
          <b-col class="_appstructure__loader-container">
            <div class="text-center">
              <i class="fa fa-spinner _appstructure__spin-icon" aria-hidden="true"></i>
              <p class="_appstructure__spin-p">{{ message }}</p>
            </div>
          </b-col>
          <b-col md="4"></b-col>
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
      message: String,
      overlayclass: String
    },
    data: function(){
      return {};
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {},
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
  /* Style */
  div._appstructure__loader{
    padding-top: 85px;
    z-index: 10010;
  }
  ._appstructure__loader-container div{
    position: relative;
    padding: 20px;
    padding-bottom: 10px;
    width: 118px;
    height: 118px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    border-top: 6px solid rgb(255, 193, 7);
    border-bottom: 6px solid rgb(255, 193, 7);
    border-radius: 40%;
    background-color: white;
    box-shadow: 8px 8px 20px 5px rgba(0, 0, 0, 0.6);
  }
  ._appstructure__loader-container div svg._appstructure__spin-icon{
    position: absolute;
    left: 38px;
    font-size: 40px;
    color: #2c2e3e;
  }
  ._appstructure__loader-container div p._appstructure__spin-p{
    position: absolute;
    left: 25px;
    color: #2c2e3e;
  }
  /* Animations */
  @keyframes _appstructure__loader-pos-1{
    0% {
      top: 65px;
      -ms-transform: scale(1.2);
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    25% {
      top: 45px;
      -ms-transform: scale(0.5);
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    50% {
      top: 20px;
      -ms-transform: scale(1.2);
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    75% {
      top: 45px;
      -ms-transform: scale(0.5);
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    100% {
      top: 65px;
      -ms-transform: scale(1.2);
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
  }
  @keyframes _appstructure__loader-pos-2{
    0% {
      top: 20px;
      -ms-transform: scale(0.5) rotate(0deg);
      -webkit-transform: scale(0.5) rotate(0deg);
      transform: scale(0.5) rotate(0deg);
    }
    25% {
      top: 40px;
      -ms-transform: scale(0.95) rotate(180deg);
      -webkit-transform: scale(0.95) rotate(180deg);
      transform: scale(0.95) rotate(180deg);
    }
    50% {
      top: 55px;
      -ms-transform: scale(0.5) rotate(360deg);
      -webkit-transform: scale(0.5) rotate(360deg);
      transform: scale(0.5) rotate(360deg);
    }
    75% {
      top: 40px;
      -ms-transform: scale(0.95) rotate(540deg);
      -webkit-transform: scale(0.95) rotate(540deg);
      transform: scale(0.95) rotate(540deg);
    }
    100% {
      top: 20px;
      -ms-transform: scale(0.5) rotate(720deg);
      -webkit-transform: scale(0.5) rotate(720deg);
      transform: scale(0.5) rotate(720deg);
    }
  }
  div._appstructure__loader div p._appstructure__spin-p{
    -webkit-animation: _appstructure__loader-pos-1 2s infinite ease;
    animation: _appstructure__loader-pos-1 2s infinite ease;
  }
  div._appstructure__loader div svg._appstructure__spin-icon{
    -webkit-animation: _appstructure__loader-pos-2 2s infinite linear;
    animation: _appstructure__loader-pos-2 2s infinite linear;
  }
</style>
