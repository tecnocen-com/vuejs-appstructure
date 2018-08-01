<template>
  <b-row>
    <b-col sm="3" class="text-center">
      <b-badge pill variant="dark">{{ time }}</b-badge>
    </b-col>
    <b-col sm="9" class="text-center">
      <b-btn
      v-on:click="open({name: 'loader'})"
      variant="info">Abrir cargador</b-btn>
      <b-btn
      v-on:click="confirm()"
      variant="warning">Abrir confirmación</b-btn>
      <b-btn
      v-on:click="alert()"
      variant="danger">Abrir alerta</b-btn>
    </b-col>
  </b-row>
</template>
<script>
  export default {
    components: {},
    mixins: [],
    directives: {},
    props: {},
    data: function(){
      return {
        title: "Dashboard",
        time: 0,
        interval: null
      };
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      open: function(o){
        this.$store.commit("open", o);
        if(o.name === "loader"){
          setTimeout(() => this.$store.commit("close", o), 1500);
        }
      },
      confirm: function(){
        this.$store.commit("open", {
          name: "alert",
          title: "Título de Confirmación",
          text: "Texto de confirmación",
          buttons: [
            {
              text: "Aceptar",
              action: () => console.log("Aceptamos")
            },
            {
              text: "Imprimir",
              action: () => console.log("Imprimimos")
            },
            { text: "Cancelar" }
          ]
        });
      },
      alert: function(){
        this.$store.commit("open", {
          name: "alert",
          title: "Título de Alerta",
          text: "Texto de Alerta",
          buttons: [ { text: "Aceptar" } ]
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
