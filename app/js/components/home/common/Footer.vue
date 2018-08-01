<template>
  <div :class="$props.overlayclass ? $props.overlayclass : '_appstructure__footer'">
    <b-row>
      <b-col cols="12" class="text-center">
        <b-badge pill variant="dark" v-html="$props.text"></b-badge>
      </b-col>
    </b-row>
  </div>
</template>
<script>
  export default {
    components: {},
    mixins: [],
    directives: {},
    props: {
      text: String,
      overlayclass: String
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
<style scoped>
  ._appstructure__footer{
    height: 56px;
    background-color: #ffc107;
    padding: 0px 15px 0px 15px;
  }
  ._appstructure__footer div.row{
    padding-top: 15px;
  }
  ._appstructure__footer span{
    color: white;
  }
</style>
