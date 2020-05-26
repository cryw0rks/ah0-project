import Vue from "vue";
import App from "./App.vue";
import * as auth from "./auth";
import router from "./router";
import Axios from 'axios'

Vue.prototype.$http = Axios;

Vue.prototype.$auth = auth;

Vue.config.productionTip = false;


new Vue({
  router,
  auth,
  render: h => h(App)
}).$mount("#app");
