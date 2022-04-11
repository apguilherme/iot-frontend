/* eslint-disable prettier/prettier */
const HTTP = require("../../api/http.js");

module.exports = {
  login: async function (context, data) {
    HTTP.post("/api/users/login", {
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
  },
  register: async function (context, data) {
    HTTP.post("/api/users/register", {
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
  },
  logout: function () {
    localStorage.setItem("iottoken", null);
    window.location.href = "/";
  }
};
