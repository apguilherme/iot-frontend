import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/UserProfile.vue";
import Tables from "../views/Tables.vue";
import SamplePage from "../views/SamplePage.vue";
import PageNotFound from "../views/PageNotFound.vue";

import FormDevices from "../views/FormDevices.vue";
import FormAddWidgetForm from "../views/FormAddWidget.vue";

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
        path: "/icons",
        name: "icons",
        components: { default: Icons },
      },
      {
        path: "/maps",
        name: "maps",
        components: { default: Maps },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/tables",
        name: "tables",
        components: { default: Tables },
      },
      {
        path: "/devices",
        name: "devices",
        components: { default: FormDevices },
      },
      {
        path: "/alerts",
        name: "alerts",
        components: { default: SamplePage },
      },
      {
        path: "/addWidget",
        name: "addWidget",
        components: { default: FormAddWidgetForm },
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

router.beforeEach(async (to) => { // middleware to check if user is authenticated.
  let tkn = localStorage.getItem("iottoken");
  if (!tkn && to.name !== "login") {
    return { name: "login" };
  } else if (tkn && to.name === "login") {
    return { name: "dashboard" };
  }
});

export default router;
