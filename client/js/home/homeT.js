module.exports = {
  dashboard: require("./dashboard/dashboard.js"),
  test: require("./test/test.js"),
  
  home: `
    <div>
      <transition name="slide-fade">
        <loader :active="loader.state" message="Cargando"></loader>
      </transition>
      <transition name="slide-fade">
        <confirm :active="confirm.state" 
        :description="confirm.description"
        :accept="accept"
        :close="close"></confirm>
      </transition>
      <transition name="slide-fade">
        <alert
        :active="alert.state" 
        :description="alert.description"
        :close="close"></alert>
      </transition>
      
      <heading :profile="profile"></heading>
      
      <my-menu></my-menu>
      
      <breadcrumb></breadcrumb>
      
      <transition name="slide-fade">
        <router-view
        :open="open"
        :onaccept="onAccept"
        :close="close"></router-view>
      </transition>
      
      <foot :year="year"></foot>
    </div>
  `
};