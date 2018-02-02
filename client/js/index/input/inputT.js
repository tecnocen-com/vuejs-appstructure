module.exports = `
  <div>
    <label>{{ label }}:</label>
    <input
    v-on:keydown.space.prevent
    v-on:keydown="update({ [name]: value }, $event.keyCode)"
    v-model="value"
    :class="error ? 'wrong-input' : ''"
    :ref="name"
    :name="name"
    :type="type"
    maxlength="64">
  </div>
`;