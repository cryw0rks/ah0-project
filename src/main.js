import Vue from "vue";
import App from "./App.vue";
import * as auth from "./auth";
import * as dataUser from "./data/user";
import * as dataContent from "./data/content";
import * as c0re from "./c0re";
import router from "./router";
import Axios from "axios";
import marked from "marked";
import lodash from "lodash";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Tokyo");

Vue.prototype.$http = Axios;

Vue.prototype.$moment = moment;

Vue.prototype.$c0re = c0re;

Vue.prototype.$marked = marked;
Vue.prototype.$lodash = lodash;

Vue.prototype.$dataUser = dataUser;
Vue.prototype.$dataContent = dataContent;

Vue.prototype.$auth = auth;

Vue.config.productionTip = false;

new Vue({
  router,
  auth,
  dataUser,
  dataContent,
  moment,
  marked,
  lodash,
  render: h => h(App)
}).$mount("#app");
