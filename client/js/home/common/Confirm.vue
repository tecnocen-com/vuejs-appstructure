<template>
  <div v-if="active">
    <div>
      <h3>{{ description.title }}</h3>
    </div>
    <p><b v-html="description.text"></b></p>
    <div>
      <button v-on:click.prevent="accept()" type="button"><span>{{ description.accept }}</span></button>
      <button v-on:click.prevent="close('confirm')" type="button"><span>{{ description.close }}</span></button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      active: Boolean,
      description: Object,
      accept: Function,
      close: Function
    },
    data: function(){
      return {};
    },
    computed: {},
    methods: {
      onAccept: function(){}
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