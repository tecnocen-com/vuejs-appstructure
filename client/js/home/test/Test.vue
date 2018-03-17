<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <input v-model="value" type="number">
      <span>Valor al cuadrado: {{ square }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      open: Function,
      onaccept: Function,
      close: Function
    },
    data: function(){
      return {
        title: "Test",
        value: 0
      };
    },
    computed: {
      square: function(){
        return this.value*this.value;
      }
    },
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