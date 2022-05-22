/* eslint-disable prettier/prettier */
const HTTP = require("../../api/http.js");

module.exports = {

  // DASHBOARD
  
  getAllUserDashboards: async function (context) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.get("/api/dashboards/all")
      .then((res) => {
        context.commit("setDashboards", res.data.dashboards);
      })
      .catch((error) => {
        console.log(error)
        context.commit("setDashboards", null);
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  deleteDashboard: async function (context, dashboardID) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.delete(`/api/dashboards/delete/${dashboardID}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      });
    context.commit("dashboard/setLoading", false, { root: true });
  },
  createDashboard: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.post("/api/dashboards/create", {
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
    context.commit("dashboard/setLoading", false, { root: true });
  },
  updateDashboard: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.put(`/api/dashboards/update/${data.dashboardID}`, {
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
    context.commit("dashboard/setLoading", false, { root: true });
  },
  updateActiveDashboard: async function (context, data) {
    context.commit("dashboard/setLoading", true, { root: true });
    await HTTP.put(`/api/dashboards/update/${data.dashboardID}`, {
      "isActive": data.isActive,
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
