/* eslint-disable prettier/prettier */
const HTTP = require("../../api/http.js");

module.exports = {

  // USER

  login: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.post("/api/users/login", {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        localStorage.setItem("iottoken", res.data.token);
        context.commit("setUserToken", res.data.token);
        context.commit("setUserInfo", res.data.userInfo);
        context.commit("setLoginMessages", { success: res.data.message, failure: "", });
        window.location.href = "/";
      })
      .catch((error) => {
        localStorage.setItem("iottoken", null);
        context.commit("setUserToken", null);
        context.commit("setUserInfo", null);
        context.commit("setLoginMessages", { success: "", failure: "failure: " + error.message, });
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  register: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.post("/api/users/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        context.commit("setRegisterMessages", { success: res.data.message + ": created " + res.data.email + ". You can try to login now!", failure: "", });
      })
      .catch((error) => {
        context.commit("setUserToken", null);
        context.commit("setRegisterMessages", { success: "", failure: "failure: " + error.message, });
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  logout: function (context) {
    context.commit("dashboard/setLoading", true, { root: true });
    context.commit("setUserInfo", null);
    context.commit("setDevices", null);
    context.commit("setDashboards", null);
    localStorage.setItem("iottoken", null);
    window.location.href = "/";
    context.commit("dashboard/setLoading", false, { root: true });
  },
  getUserNotifications: async function (context) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.get("/api/alerts/notifications")
      .then((res) => {
        context.commit("setNotifications", res.data.userNotifications);
      })
      .catch((error) => {
        context.commit("setNotifications", []);
        console.log("Error retrieving notifications:", error);
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },

  // BROKER

  getBrokerAuth: async function (context) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.get("/api/users/brokerauth")
      .then((res) => {
        context.commit("setBrokerAuth", res.data.credentials);
      })
      .catch((error) => {
        context.commit("setBrokerAuth", null);
        console.log("Error retrieving broker auth:", error);
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  getBrokerAuthReconnect: async function (context) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.get("/api/users/brokerauthreconn")
      .then((res) => {
        context.commit("setBrokerAuth", res.data.credentials);
      })
      .catch((error) => {
        context.commit("setBrokerAuth", null);
        console.log("Error retrieving broker auth:", error);
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },

};
