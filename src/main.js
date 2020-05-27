import Vue from "vue";
import App from "./App.vue";
import * as auth from "./auth";
import * as dataUser from "./data/user";
import router from "./router";
import Axios from "axios";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Tokyo");

Vue.prototype.$http = Axios;

Vue.prototype.$moment = moment;

Vue.prototype.$dataUser = dataUser;

Vue.prototype.$auth = auth;

Vue.config.productionTip = false;

new Vue({
  router,
  auth,
  dataUser,
  moment,
  render: h => h(App)
}).$mount("#app");
