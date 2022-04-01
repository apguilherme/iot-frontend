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
  deleteDevice: async function (context, data) {
    let deviceID = data._id;
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
      "templateID": data.templateID,
      "templateName": data.templateName,
      "description": data.description
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },
};
