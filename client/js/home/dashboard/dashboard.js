module.exports = {
  template: require("./dashboardT.js"),
  props: {
    myProp: Number
  },
  data: function(){
    return {
      title: "Dashboard",
      time: 0
    };
  },
  computed: {},
  methods: {},
  beforeCreate: function(){},
  created: function(){
      var me = this;
      setInterval(function(){ return ++me.time; }, 1000);
  },
  beforeMount: function(){},
  mounted: function(){},
  beforeUpdate: function(){},
  updated: function(){},
  activated: function(){},
  deactivated: function(){},
  beforeDestroy: function(){},
  destroyed: function(){}
};