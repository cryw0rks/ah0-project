import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/user",
    name: "User",
    component: () =>
      import("../views/User.vue")
  },
  {
    path: "/kami",
    name: "Kami",
    component: () =>
      import("../views/Kami.vue")
  },
  {
    path: "/setting",
    name: "Setting",
    component: () =>
      import("../views/Setting.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register.vue")
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: () =>
      import("../views/Feedback.vue")
  },
  {
    path: "/reportbug",
    name: "Report Bug",
    component: () =>
      import("../views/ReportBug.vue")
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import("../views/Logout.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
