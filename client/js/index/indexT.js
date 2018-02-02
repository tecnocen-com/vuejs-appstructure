module.exports = {
  index: `
    <div>
      <form v-on:submit.prevent action="#" method="POST">
        <div>
          <h1>{{ mainMessage.title }}</h1>
          <h4>{{ mainMessage.subtitle }}</h4>
        </div>
        <div>
          <my-input name="username" label="Usuario" type="text" :error="alertMessage !== '' && error !== 1" :update="update"></my-input>
          <my-input name="password" label="Contraseña" type="password" :error="alertMessage !== '' && error !== 0" :update="update"></my-input>
        </div>
        <div v-if="alertMessage !== ''">
          <p><b>{{ alertMessage }}</b></p>
        </div>
        <div>
          <button v-on:click="login()" :class="loading ? 'disabled' : ''" type="button">
            <b>{{ loginMessage }}</b>
          </button>
        </div>
      </form>
      <div>
        <button v.on:click.prevent :class="loading ? 'disabled' : ''" type="button">
          {{ forgottenMessage }}
        </button>
      </div>
    </div>
  `
};