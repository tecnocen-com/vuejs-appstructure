module.exports = {
  template: require("./dashboardT.js"),
  props: {
    open: Function,
    onaccept: Function,
    close: Function
  },
  data: function(){
    return {
      title: "Dashboard",
      time: 0
    };
  },
  computed: {},
  methods: {
    customAccept: function(){
      this._props.onaccept(function(){ console.log("Accept from dashboard"); });
      this._props.open("confirm", {
        title: "Título de ConfirmacióN",
        text: "Texto de confirmacióN",
        accept: "AceptaR",
        close: "CancelaR"
      });
    }
  },
  beforeCreate: function(){},
  created: function(){
      var me = this;
      this.interval = setInterval(function(){ return ++me.time; }, 1000);
  },
  beforeMount: function(){},
  mounted: function(){},
  beforeUpdate: function(){},
  updated: function(){},
  activated: function(){},
  deactivated: function(){},
  beforeDestroy: function(){
    clearInterval(this.interval);
  },
  destroyed: function(){}
};