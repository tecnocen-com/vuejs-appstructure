module.exports = {
  template: require("./inputT.js"),
  props: {
    name: String,
    label: String,
    type: String,
    error: Boolean,
    update: Function
  },
  data: function(){
    return {
      value: ""
    };
  },
  computed: {},
  methods: {},
  beforeCreate: function(){},
  created: function(){},
  beforeMount: function(){},
  mounted: function(){
    if(this.$refs.username)
      this.$refs.username.autofocus = true;
  },
  beforeUpdate: function(){},
  updated: function(){},
  activated: function(){},
  deactivated: function(){},
  beforeDestroy: function(){},
  destroyed: function(){}
};