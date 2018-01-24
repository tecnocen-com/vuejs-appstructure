module.exports = `
  <div>
    <h1>{{config.title}}</h1>
    <div>
      <input v-model="config.value" type="number">
      <span>Valor al cuadrado: {{config.square}}</span>
    </div>
  </div>
`;