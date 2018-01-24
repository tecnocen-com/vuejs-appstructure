module.exports = new Vue({
    data: {
        title: "Test",
        value: 0
    },
    computed: {
      square: function(){
        return this.value*this.value;
      }
    },
    methods: {
        init: function(){}
    }
});