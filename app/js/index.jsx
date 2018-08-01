import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'babel-polyfill';

import { store } from "./store/store.jsx";
import { router } from "./routing/routing.jsx";

import Index from "./Index.vue";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

new Vue({
  el: '#index',
  store,
  router,
  render: h => h(Index)
});
