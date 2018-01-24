module.exports = new Vue({
    data: {
        title: "Dashboard",
        time: 0
    },
    methods: {
        init: function(){}
    },
    created: function(){
      var me = this;
      setInterval(function(){ return ++me.time; }, 1000);
    }
});