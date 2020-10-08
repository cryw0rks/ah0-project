import Vue from "vue";
import VueRouter from "vue-router";
import * as auth from "../auth";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: Home
  },
  {
    path: "/user",
    name: "User",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: () => import("../views/User.vue")
  },
  {
    path: "/user/:userId",
    name: "User Profile",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: () => import("../views/UserProfile.vue")
  },
  {
    path: "/content/:codeURL",
    name: "Content Show",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: () => import("../views/ContentShow.vue")
  },
  {
    path: "/content/:codeURL/edit",
    name: "Content Edit",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: () => import("../views/ContentEdit.vue")
  },
  {
    path: "/discord",
    name: "Discord",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: () => import("../views/Discord.vue")
  },
  {
    path: "/kami",
    name: "Kami",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: () => import("../views/Kami.vue")
  },
  {
    path: "/content",
    name: "Content Manage",
    meta: {
      loginRequired: true,
      hideOnLogin: false
    },
    component: () => import("../views/Content.vue")
  },
  {
    path: "/kami/manage",
    name: "Kami Manage",
    meta: {
      loginRequired: true,
      hideOnLogin: false
    },
    component: () => import("../views/KamiManage.vue")
  },
  {
    path: "/kami/create",
    name: "Kami Create",
    meta: {
      loginRequired: true,
      hideOnLogin: false
    },
    component: () => import("../views/KamiCreate.vue")
  },
  {
    path: "/setting",
    name: "Setting",
    meta: {
      loginRequired: true,
      hideOnLogin: false
    },
    component: () => import("../views/Setting.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      loginRequired: false,
      hideOnLogin: true
    },
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      loginRequired: false,
      hideOnLogin: true
    },
    component: () => import("../views/Register.vue")
  },
  {
    path: "/feedback",
    name: "Feedback",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: () => import("../views/Feedback.vue")
  },
  {
    path: "/reportbug",
    name: "Report Bug",
    meta: {
      loginRequired: false,
      hideOnLogin: false
    },
    component: () => import("../views/ReportBug.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const lol = await auth.isLogin();
  //console.log('log', lol)
  if (lol["isLogin"]) {
    if (to.meta.hideOnLogin) {
      return next("/");
    }
  } else {
    if (to.meta.loginRequired) {
      return next("/login");
    }
  }
  next();
});

export default router;
