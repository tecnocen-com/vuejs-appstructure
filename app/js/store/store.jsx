import Vue from "vue";
import Vuex from "vuex";

import { home } from "./home/store.home.jsx";

import { router } from "./../routing/routing.jsx";
import { Veza } from "./../plugins/veza.jsx";
import * as Buto from './../../file/config.json';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    home
  },
  state: {        // Data
    storageName: "asbioybasiy_VueJS-Appstructure_dvas=!%%#23423",
    access: {
      baseUrl: null,
      dataUrl: "/f1/",
      tokenUrl: "/oauth2/token",
      headers: {
        Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    },
    veza: {
      name: "form",
      token: {
        name: "accessToken",
        value: null
      },
      url: null
    },
    profile: {
      name: "Unknown user",
      email: null
    },
    models: {
      form: null
    },
    loader: {
      state: false
    },
    alert: {
      state: false,
      buttons: [],
      description: {
        title: "Título de Confirmación",
        text: "Texto de confirmación"
      }
    },
    year: new Date().getUTCFullYear()
  },
  getters: {      // Computed
    loginUrl(state){
      return state.access.baseUrl + state.access.tokenUrl;
    }
  },
  mutations: {          // Methods
    setProfile(state, o){
      for(let u in o)
        state.profile[u] = o[u];
    },
    open(state, o){
      if(o.name === "alert"){
        state[o.name].description.title = o.title;
        state[o.name].description.text = o.text;
        state[o.name].buttons = o.buttons;
      }
      state[o.name].state = true;
    },
    close(state, o){
      state[o.name].state = false;
    },
    accept(state, i){
      if(state.alert.buttons[i].action instanceof Function){
        state.alert.buttons[i].action();
        return;
      }
      state.alert.state = false;
    },

    login(state){
      if(state.veza.token.value){
        new Veza(state.veza).then(service => {
          state.models.form = service.form.setModel("form");
          router.push({ name: "dashboard" });
        }).catch(error => console.log("bad", error));
      }
    },
    logout(state, o){
      if(o.finish || (o.error.data && o.error.data.status === 401 && o.error.data.name === "Unauthorized")){
        localStorage.removeItem(state.storageName);
        state.veza.token.value = null;
        router.push({ name: "login" });
      }
    }
  },
  actions: {      // Mutations than can call mutations
    manualAuth({commit, state}, o){
      localStorage.setItem(state.storageName, btoa(JSON.stringify({ form: o.form })));
      state.veza.token.value = o.form;
      commit("login");
    },
    autoAuth({commit, state}, o){
      let token = localStorage.getItem(state.storageName);
      if(token){
        token = JSON.parse(atob(token)).form;
      }
      state.veza.token.value = token;
      state.access.baseUrl = Buto.config.form;
      state.veza.url = Buto.config.form + state.access.dataUrl;
      commit("login");
    }
  }
});
