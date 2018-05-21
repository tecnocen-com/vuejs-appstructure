<template>
  <div>
    <form v-on:submit.prevent action="#" method="POST">
      <div>
        <h1>{{ mainMessage.title }}</h1>
        <h4>{{ mainMessage.subtitle }}</h4>
      </div>
      <div>
        <my-input
        name="username"
        label="Usuario"
        type="text"
        :error="$store.state.alertMessage !== '' && $store.state.error !== 1"></my-input>
        <my-input
        name="password"
        label="Contraseña"
        type="password"
        :error="$store.state.alertMessage !== '' && $store.state.error !== 0"></my-input>
      </div>
      <div v-if="$store.state.alertMessage !== ''">
        <p><b>{{ $store.state.alertMessage }}</b></p>
      </div>
      <div>
        <button v-on:click="login()" :class="$store.state.loading ? 'disabled' : ''" type="button">
          <b>{{ loginButton }}</b>
        </button>
      </div>
    </form>
    <div>
      <button v.on:click.prevent :class="$store.state.loading ? 'disabled' : ''" type="button">
        {{ forgottenButton }}
      </button>
    </div>
  </div>
</template>
<script>
  import Input from "./components/input/Input.vue";

  export default {
    components: {
      "my-input": Input
    },
    data: function(){
      return {
        hidden: true,

        mainMessage: {
          title: "Bienvenido",
          subtitle: "Ingrese a su cuenta"
        },

        loginButton: "Continuar",
        forgottenButton: "¿Olvidaste tu contraseña?"
      };
    },
    methods: {
      login(){
        this.$store.commit("login");
      }
    },
    created: function(){},
    mounted: function(){
      this.hidden = false;
    }
  };
</script>
<style></style>
