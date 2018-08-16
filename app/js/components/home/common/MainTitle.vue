<template>
  <div>
    <slot>
      <h1 v-html="title"></h1>
      <hr>
    </slot>
  </div>
</template>
<script>
  export default {
    name: "mainTitle",
    components: {},
    mixins: [],
    directives: {},
    props: {
      title: String
    },
    data: function(){
      return {};
    },
    computed: {},
    watch: {},
    filters: {},
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
<style scoped></style>
