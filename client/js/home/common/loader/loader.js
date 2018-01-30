module.exports = {
  template: require("./loaderT.js"),
  props: {},
  data: function(){
    return {
      active: false,
      message: "Cargando"
    };
  },
  computed: {},
  methods: {
    loading(){ this.active = true; },
    loaded(){ this.active = false; }
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
};