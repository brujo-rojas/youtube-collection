import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/videos",
    name: "videos",
    component: () =>
      import(/* webpackChunkName: "videos" */ "../views/VideosView.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/DetailView.vue"),
  },
  { path: "/*", redirect: "/videos" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
