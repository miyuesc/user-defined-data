import { Component } from "vue-router/types/router";

const routes: { path: string; name: string; component: Component }[] = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue")
  }
];

export default routes;
