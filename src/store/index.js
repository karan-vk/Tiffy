import Vue from "vue";
import Vuex from "vuex";
import { aut } from "../fb";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: aut.currentUser,
    route: "Login.vue",
    snackbar1:false
  },
  mutations: {},
  actions: {},
  modules: {},
});
