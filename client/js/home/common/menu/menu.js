module.exports = {
  template: require("./menuT.js"),
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
};