module.exports = {
  template: require("./confirmT.js"),
  props: {
    active: Boolean,
    description: Object,
    accept: Function,
    close: Function
  },
  data: function(){
    return {};
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