module.exports = `
  <div>
    <ul v-for="(menu, menuIndex) in menu">
      <li><router-link :to="menu.path">{{ menu.title }}</router-link></li>
    </ul>
  </div>
`;