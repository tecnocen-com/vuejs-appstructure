module.exports = {
  template: require("./testT.js"),
  props: {
    myProp: Number
  },
  data: function(){
    return {
      title: "Test",
      value: 0
    };
  },
  computed: {
    square: function(){
      return this.value*this.value;
    }
  },
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