module.exports = {
  getDashboards: function (context) {
    return context.dashboards;
  },
  getLoading: function (context) {
    return context.loading;
  },
  getSelectedDashboard: function (context) {
    return context.selectedDashboard;
  },
};
