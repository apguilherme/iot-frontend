module.exports = {
  setDashboards: function (context, dashboards) {
    context.dashboards = dashboards;
  },
  setLoading: function (context, data) {
    context.loading = data;
  },
  setSelectedDashboard: function (context, data) {
    context.selectedDashboard = data;
  },
};
