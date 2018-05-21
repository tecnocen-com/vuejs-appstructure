<template>
  <div v-show="$store.state.alert.state">
    <div>
      <h3>{{ $store.state.alert.description.title }}</h3>
    </div>
    <p><b v-html="$store.state.alert.description.text"></b></p>
    <div>
      <button v-on:click.prevent="interact()" type="button">
        <span>{{ $store.state.alert.description.close }}</span>
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
      interact(){
        this.$store.commit("close", { name: "alert" });
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
