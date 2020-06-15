import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { aut } from "./fb";
import './registerServiceWorker'
Vue.config.productionTip = false;

let app = "";
aut.onAuthStateChanged(function(user) {
  
  
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
