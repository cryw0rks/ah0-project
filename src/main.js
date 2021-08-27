import Vue from "vue";
import App from "./App.vue";
import * as c0re from "./c0re";
import router from "./router";
import marked from "marked";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Tokyo");

Vue.prototype.$moment = moment;

Vue.prototype.$c0re = c0re;

Vue.prototype.$marked = marked;

Vue.config.productionTip = false;

new Vue({
  router,
  c0re,
  moment,
  marked,
  render: h => h(App)
}).$mount("#app");
