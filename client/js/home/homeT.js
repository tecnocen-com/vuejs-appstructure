module.exports = {
  dashboard: require("./dashboard/dashboard.js"),
  test: require("./test/test.js"),
  
  home: `
    <div>
      <transition name="slide-fade">
        <loader></loader>
      </transition>
      <transition name="slide-fade">
        <confirm></confirm>
      </transition>
      <transition name="slide-fade">
        <alert></alert>
      </transition>
      
      <heading :profile="profile"></heading>
      
      <my-menu></my-menu>
      
      <breadcrumb></breadcrumb>
      
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
      
      <foot></foot>
    </div>
  `
};