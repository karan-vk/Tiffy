import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Lost from "../views/404.vue";
import { aut } from "../fb";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Login,
    meta: { isLogedin: true },
  },
  {
    path: "/project",
    name: "Project",
    component: () => import("../views/Projects.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/team",
    name: "Team",
    component: () => import("../views/Team.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/*",
    name: "404",
    component: Lost,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isloged = to.matched.some((x) => x.meta.isLogedin);

  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = aut.currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else if (currentUser && to.path == "/" && isloged) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
