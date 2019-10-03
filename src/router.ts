import Vue from "vue";
import Router from "vue-router";
import routes from "@/routes";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/layout/index.vue"),
      children: [...routes]
    }
  ]
});
