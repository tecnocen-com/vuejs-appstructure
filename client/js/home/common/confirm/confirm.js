module.exports = {
  template: require("./confirmT.js"),
  props: {},
  data: function(){
    return {
      description: {
        title: "",
        text: "",
        accept: "",
        cancel: ""
      },
      active: false
    };
  },
  computed: {},
  methods: {
    onAccept: function(){}
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