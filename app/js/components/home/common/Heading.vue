<template>
  <div>
    <slot name="header">
      <b-navbar toggleable="sm" type="light" variant="warning">
        <b-navbar-brand tag="h1" class="mb-0">
          {{ $props.title }}
        </b-navbar-brand>
        <b-navbar-toggle target="customCollapse" right></b-navbar-toggle>
        <b-collapse id="customCollapse" is-nav>
          <b-navbar-nav>
            <b-nav-text>{{ $props.name }}</b-nav-text>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-on:click="logout()" right>Cerrar Sesión</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    <slot>
  </div>
</template>
<script>
  export default {
    name: "heading",
    components: {},
    mixins: [],
    directives: {},
    props: {
      title: String,
      name: String
    },
    data: function(){
      return {};
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      logout(){
        this.$emit("logout");
      }
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
