module.exports = {
  template: require("./breadcrumbT.js"),
  props: {},
  data: function(){
    return {
      home: "Inicio"
    };
  },
  computed: {
    path: function(){
      return this.$route.fullPath.split("/");
    }
  },
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
};