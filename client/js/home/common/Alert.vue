<template>
  <div v-if="active">
    <div>
        <h3>{{ description.title }}</h3>
    </div>
    <p><b v-html="description.text"></b></p>
    <div>
        <button v-on:click.prevent="close('alert')" type="button"><span>{{ description.close }}</span></button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      active: Boolean,
      description: Object,
      close: Function
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