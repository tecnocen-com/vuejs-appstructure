<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ time }}</p>
    <button v-on:click="open({name: 'loader'})">Abrir cargador</button>
    <button v-on:click="close({name: 'loader'})">Cerrar cargador</button>
    <button v-on:click="accept()">Abrir confirmación</button>
    <button v-on:click="open({
      name: 'alert',
      title: 'Título de AlertA',
      text: 'Texto de alertA',
      close: 'AceptaR'
    })">Abrir alerta</button>
  </div>
</template>
<script>
  export default {
    props: {},
    data: function(){
      return {
        title: "Dashboard",
        time: 0,
        interval: null
      };
    },
    computed: {},
    methods: {
      open: function(o){
        this.$store.commit("open", o);
      },
      close: function(o){
        this.$store.commit("close", o);
      },
      accept: function(){
        this.$store.commit("onAccept", function(){ console.log("Accept from dashboard"); });
        this.open({
          name: "confirm",
          title: "Título de ConfirmacióN",
          text: "Texto de confirmacióN",
          accept: "AceptaR",
          close: "CancelaR"
        });
      }
    },
    beforeCreate: function(){},
    created: function(){
        this.interval = setInterval(() => ++this.time, 1000);
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
  }
</script>
<style></style>
