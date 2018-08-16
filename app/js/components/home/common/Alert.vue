<template>
  <div :class="$props.overlayclass ? $props.overlayclass : '_appstructure__modal-overlay _appstructure__alert'">
    <div :class="$props.containerclass ? $props.containerclass : '_appstructure__alert-container'">
      <slot name="header">
        <div class="_appstructure__alert-title">
          <h3 v-html="title"></h3>
        </div>
      </slot>
      <slot name="body">
        <p class="_appstructure__alert-paragraph">
          <b v-html="text"></b>
        </p>
      </slot>
      <slot name="buttons" :buttons="buttons">
        <div class="_appstructure__alert-buttons text-right">
          <b-btn
          v-for="(b, i) in buttons"
          v-on:click="interact(i)"
          :variant="b.action ? 'warning' : 'outline-warning'">
          <span v-html="b.text"></span>
        </b-btn>
      </div>
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "alert",
    components: {},
    mixins: [],
    directives: {},
    props: {
      overlayclass: String,
      containerclass: String,
      title: String,
      text: String,
      buttons: Array
    },
    data: function(){
      return {};
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      interact(i){
        this.$store.commit("accept", i);
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
  div._appstructure__alert{
    z-index: 10000;
  }
  @media(min-width: 767px){
  	div._appstructure__alert-container{
  		width:350px;
  	}
  }

  @media(max-width: 767px){
  	div._appstructure__alert-container{
  		width:auto;
  	}
  }
  div._appstructure__alert-container{
      background-color: rgb(255, 255, 255);
      border: 1px solid white;
      border-radius: 6px;
      top: 10%;
      position: relative;
      margin-left: auto;
      margin-right: auto;
      box-shadow: 8px 8px 20px 5px rgba(0, 0, 0, 0.6);
  }

  div._appstructure__alert-title{
    background-color: rgb(255, 193, 7);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    padding-left: 0px;
    padding-right: 0px;
    width: 100%;
  }

  div._appstructure__alert-title h3,
  p._appstructure__alert-paragraph{
    padding: 18px 25px;
  }

  p._appstructure__alert-paragraph{
  	background-color: rgb(238, 238, 238);
    border-radius: 5px;
  	word-wrap: break-word;
  }

  div._appstructure__alert-buttons{
    padding: 0px 15px 15px 0px;
  }
</style>
