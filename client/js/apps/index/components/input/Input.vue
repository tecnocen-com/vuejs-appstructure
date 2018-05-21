<template>
  <div>
    <label>{{ label }}:</label>
    <input
    v-on:keydown.space.prevent
    v-on:keydown="change($event.keyCode)"
    v-model="value"
    :class="error ? 'wrong-input' : ''"
    :ref="name"
    :name="name"
    :type="type"
    maxlength="64">
  </div>
</template>
<script>
  export default {
    props: {
      name: String,
      label: String,
      type: String,
      error: Boolean
    },
    data: function(){
      return {
        value: ""
      };
    },
    computed: {},
    methods: {
      change: function(key){
        this.$nextTick(() => {
          this.$store.commit("update", { [this.$props.name]: this.value });
          if(key === 13)
            this.$store.commit("login");
        });
      }
    },
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
  }
</script>
<style></style>
