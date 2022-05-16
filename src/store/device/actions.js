/* eslint-disable prettier/prettier */
const HTTP = require("../../api/http.js");

module.exports = {
  getAllUserDevices: async function (context) {
    HTTP.get("/api/devices/all")
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
  },
  deleteDevice: async function (context, data) {
    HTTP.delete(`/api/devices/delete/${data.deviceId}/${data.emqxRuleId}`, {
      "saverRule": data.saverRule
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },
  createDevice: async function (context, data) {
    HTTP.post("/api/devices/create", {
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
  },
  updateDevice: async function (context, data) {
    HTTP.put(`/api/devices/update/${data.deviceID}`, {
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
  },
  updateSaverRule: async function (context, data) {
    HTTP.put(`/api/devices/updateSaverRule/${data.deviceID}`, {
      "saverRule": data.saverRule,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },

  // ALERTS

  deleteAlert: async function (context, data) {
    HTTP.delete(`/api/alerts/delete/${data.deviceId}/${data.emqxRuleId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },
  createAlert: async function (context, data) {
    HTTP.post("/api/alerts/create", {
      "alert": data
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },
  updateAlertRule: async function (context, data) {
    HTTP.put(`/api/alerts/updateAlertRule/${data.deviceId}`, {
      "alertRule": data.alertRule,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },

};
