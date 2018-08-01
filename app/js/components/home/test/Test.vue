<template>
  <b-row>
    <b-col sm="12">
      <b-input-group prepend="Valor">
        <b-form-input v-model="value" type="number"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info">Valor al cuadrado: {{ square }}</b-btn>
        </b-input-group-append>
      </b-input-group>
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
        value: 0
      };
    },
    computed: {
      square: function(){
        return this.value * this.value;
      }
    },
    watch: {},
    filters: {},
    methods: {},
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
  }
</script>
<style></style>
