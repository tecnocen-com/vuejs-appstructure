<template>
  <div v-show="$store.state.loader.state">
    <b>{{ message }}</b>
  </div>
</template>
<script>
  export default {
    props: {
      active: Boolean,
      message: String
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
