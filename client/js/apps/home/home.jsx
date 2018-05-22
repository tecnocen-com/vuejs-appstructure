import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'babel-polyfill';
import { Store } from "./store/store.jsx";
import Home from "./Home.vue";
const Dashboard = resolve => require(["./components/dashboard/Dashboard.vue"], resolve);
const Test = resolve => require(["./components/test/Test.vue"], resolve);

Vue.use(VueRouter);
new Vue({
  el: '#home',
  store: Store,
  router: new VueRouter({
    routes: [
      { title: "Inicio", path: "/", component: Dashboard },
      { title: "Test", path: "/test", component: Test },
      { path: '*', redirect: '/' }
    ]
  }),
  render: h => h(Home)
});
