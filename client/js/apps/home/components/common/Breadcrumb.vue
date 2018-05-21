<template>
  <div>
    <h4><b>Breadcrumb</b></h4>
    <ul>
      <li>{{ home }}</li>
      <li v-for="p in path" v-if="p !== ''">{{ p }}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {},
    data: function(){
      return {
        home: "Inicio"
      };
    },
    computed: {
      path: function(){
        return this.$route.fullPath.split("/");
      }
    },
    methods: {},
    beforeCreate: function(){},
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