module.exports = {
  setUserToken: function (context, userToken) {
    context.userToken = userToken;
  },
  setUserInfo: function (context, userInfo) {
    context.userInfo = userInfo;
  },
  setLoginMessages: function (context, data) {
    context.loginMessages = data;
  },
  setRegisterMessages: function (context, data) {
    context.registerMessages = data;
  },
  setNotifications: function (context, data) {
    context.notifications = data;
  },
  setBrokerAuth: function (context, data) {
    context.brokerAuth = data;
  },
};
