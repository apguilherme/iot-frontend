import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/UserProfile.vue";
import Alerts from "../views/Alerts.vue";
import Notifications from "../views/Notifications.vue";
import PageNotFound from "../views/PageNotFound.vue";
//import SamplePage from "../views/SamplePage.vue";

import Devices from "../views/Devices.vue";
import Widgets from "../views/Widgets.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/devices",
        name: "devices",
        components: { default: Devices },
      },
      {
        path: "/alerts",
        name: "alerts",
        components: { default: Alerts },
      },
      {
        path: "/widgets",
        name: "widgets",
        components: { default: Widgets },
      },
      {
        path: "/notifications",
        name: "notifications",
        components: { default: Notifications },
      },
      { path: "/:pathMatch(.*)*", component: PageNotFound },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
      { path: "/:pathMatch(.*)*", component: PageNotFound },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach(async (to) => {
  // middleware to check if user is authenticated.
  let tkn = localStorage.getItem("iottoken");
  let hasTkn = tkn && tkn !== "null" ? tkn : false;
  if (!hasTkn && to.name !== "login" && to.name !== "register") {
    // avoid navigation without token.
    return { name: "login" };
  } else if (hasTkn && to.name === "login") {
    // already logged.
    return { name: "dashboard" };
  }
});

export default router;
