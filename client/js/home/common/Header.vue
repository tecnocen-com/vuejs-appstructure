<template>
  <div>
    <a><span>{{ profile.name }}</span></a>
    <a href="/logout"><i></i> Cerrar Sesión </a>
  </div>
</template>
<script>
  export default {
    props: {
      profile: Object
    },
    data: function(){
      return {
        active: true
      };
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