/* eslint-disable prettier/prettier */
const HTTP = require("../../api/http.js");

module.exports = {
  getAllUserDashboards: async function (context) {
    HTTP.get("/api/dashboards/all")
      .then((res) => {
        context.commit("setDashboards", res.data.dashboards);
      })
      .catch((error) => {
        console.log(error)
        context.commit("setDashboards", null);
      });
  },
  deleteDashboard: async function (context, dashboardID) {
    HTTP.delete(`/api/dashboards/delete/${dashboardID}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },
  createDashboard: async function (context, data) {
    HTTP.post("/api/dashboards/create", {
      "name": data.name,
      "description": data.description,
      "widgets": data.widgets,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },
  updateDashboard: async function (context, data) {
    HTTP.put(`/api/dashboards/update/${data.dashboardID}`, {
      "name": data.name,
      "description": data.description,
      "widgets": data.widgets,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },
  updateActiveDashboard: async function (context, data) {
    HTTP.put(`/api/dashboards/update/${data.dashboardID}`, {
      "isActive": data.isActive,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
  },
};
