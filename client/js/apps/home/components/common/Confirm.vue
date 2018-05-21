<template>
  <div v-show="$store.state.confirm.state">
    <div>
      <h3>{{ $store.state.confirm.description.title }}</h3>
    </div>
    <p><b v-html="$store.state.confirm.description.text"></b></p>
    <div>
      <button v-on:click.prevent="interact(true)" type="button">
        <span>{{ $store.state.confirm.description.accept }}</span>
      </button>
      <button v-on:click.prevent="interact()" type="button">
        <span>{{ $store.state.confirm.description.close }}</span>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {},
    data: function(){
      return {};
    },
    computed: {},
    methods: {
      interact(type){
        if(type){
          this.$store.commit("accept");
          return;
        }
        this.$store.commit("close", { name: "confirm" });
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
<style></style>
