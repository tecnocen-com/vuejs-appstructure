<template>
  <div>
    &copy; {{ year }}. <a href="#" v-on:click.prevent>Tecnocen</a>
  </div>
</template>
<script>
  export default {
    props: {
      year: Number
    },
    data: function(){
      return {};
    },
    computed: {},
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
<style></style>