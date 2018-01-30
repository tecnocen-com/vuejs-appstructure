module.exports = {
  template: require("./footerT.js"),
  props: {},
  data: function(){
    return {
      text: "&copy; 2017. <a href='#' v-on:click.prevent>Tecnocen</a>"
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