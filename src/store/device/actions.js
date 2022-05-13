/* eslint-disable prettier/prettier */
const HTTP = require("../../api/http.js");

module.exports = {
  getAllUserDevices: async function (context) {
    HTTP.get("/api/devices/all")
      .then((res) => {
        context.commit("setDevices", res.data.devices);
      })
      .catch((error) => {
        console.log(error)
        context.commit("setDevices", null);
      });
  },
  deleteDevice: async function (context, deviceID) {
    HTTP.delete(`/api/devices/delete/${deviceID}`)
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
      "description": data.description
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
};
