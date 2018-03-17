<template>
  <div>
    <ul>
      <li v-for="(menu, menuIndex) in menu">
        <router-link :to="menu.path">{{ menu.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {},
    data: function(){
      return {
        menu: [
          {
            title: "Inicio",
            path: "/"
          },
          {
            title: "Test",
            path: "/test"
          }
        ]
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