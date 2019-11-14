// @ts-ignore
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// @ts-ignore
import myUI from "@miyuesc/my-ui";
Vue.use(myUI);

import "@miyuesc/my-ui/lib/styles/index.css";

import "remixicon/fonts/remixicon.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h: any) => h(App)
}).$mount("#app");
