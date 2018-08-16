<template>
  <div>
    <slot>
      <b-breadcrumb v-show="$props.path.length !== 0" class="_appstructure__breadcrumb">
        <b-breadcrumb-item v-for="p in $props.path" :key="p.name" :to="{ name: p.name }">{{ p.label }}</b-breadcrumb-item>
      </b-breadcrumb>
    </slot>
  </div>
</template>
<script>
  export default {
    name: "breadcrumb",
    components: {},
    mixins: [],
    directives: {},
    props: {
      path: Array
    },
    data: function(){
      return {};
    },
    computed: {},
    watch: {},
    filters: {},
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
<style scoped>
  @media (max-width: 576px){
    ._appstructure__breadcrumb{
      display: none;
    }
  }
  ._appstructure__breadcrumb{
    background-color: #ffffff;
    border: 1px solid #ffc107;
  }
  ._appstructure__breadcrumb .breadcrumb-item a{
    color: #909090;
  }
  ._appstructure__breadcrumb .breadcrumb-item a:hover,
  ._appstructure__breadcrumb .breadcrumb-item a:active,
  ._appstructure__breadcrumb .breadcrumb-item a:focus{
    text-decoration: none;
  }
</style>
