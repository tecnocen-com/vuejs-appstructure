<template>
  <div>
    <slot>
      <b-breadcrumb v-show="show" class="_appstructure__breadcrumb">
        <b-breadcrumb-item>{{ home }}</b-breadcrumb-item>
        <b-breadcrumb-item v-for="p in path" :key="p">{{ p }}</b-breadcrumb-item>
      </b-breadcrumb>
    </slot>
  </div>
</template>
<script>
  export default {
    components: {},
    mixins: [],
    directives: {},
    props: {},
    data: function(){
      return {
        home: "inicio"
      };
    },
    computed: {
      show: function(){
        return this.path.length !== 0;
      },
      path: function(){
        const path = this.$route.fullPath.split("/");
        let cleanPath = [];
        for(let i = 0; i < path.length; i++){
          if(path[i] !== "" && path[i] !== "inicio"){
            cleanPath.push(path[i]);
          }
        }
        return cleanPath;
      }
    },
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
