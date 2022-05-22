/* eslint-disable prettier/prettier */
const HTTP = require("../../api/http.js");

module.exports = {

  // DEVICE
  
  getAllUserDevices: async function (context) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.get("/api/devices/all")
      .then((res) => {
        context.commit("setDevices", res.data.devices);
        let alerts = [];
        res.data.devices.forEach(device => {
          device.alerts.forEach(alert => {
            alerts.push(alert);
          })
        });
        context.commit("setAlerts", alerts);
      })
      .catch((error) => {
        console.log(error)
        context.commit("setDevices", null);
        context.commit("setAlerts", null);
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  deleteDevice: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.delete(`/api/devices/delete/${data.deviceId}/${data.emqxRuleId}`, {
      "saverRule": data.saverRule
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  createDevice: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.post("/api/devices/create", {
      "name": data.name,
      "description": data.description,
      "variables": data.variables,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  updateDevice: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.put(`/api/devices/update/${data.deviceID}`, {
      "name": data.name,
      "description": data.description,
      "variables": data.variables,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  updateSaverRule: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.put(`/api/devices/updateSaverRule/${data.deviceID}`, {
      "saverRule": data.saverRule,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },

  // ALERTS

  deleteAlert: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.delete(`/api/alerts/delete/${data.deviceId}/${data.emqxRuleId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  createAlert: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.post("/api/alerts/create", {
      "alert": data
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  updateAlertRule: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.put(`/api/alerts/updateAlertRule/${data.deviceId}`, {
      "alertRule": data.alertRule,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },

};
