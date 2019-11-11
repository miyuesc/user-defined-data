import { Component } from "vue-router/types/router";

const routes: {
  path: string;
  name?: string;
  component: Component;
  children?: any[];
}[] = [
  {
    path: "/root",
    name: "root",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "/root",
        name: "home",
        component: () => import("@/views/home/index.vue")
      },
      {
        path: "/build",
        name: "build",
        component: () => import("@/views/editPages/index.vue")
      }
    ]
  },
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/index.vue")
  }
];

export default routes;
