module.exports = `
  <div>
    <h1>{{ title }}</h1>
    <p>{{ time }}</p>
    <button v-on:click="open('loader')">Abrir cargador</button>
    <button v-on:click="close('loader')">Cerrar cargador</button>
    <button v-on:click="customAccept()">Abrir confirmación</button>
    <button v-on:click="open('alert', {
      title: 'Título de AlertA',
      text: 'Texto de alertA',
      close: 'AceptaR'
    })">Abrir alerta</button>
  </div>
`;