const jwt = require("jsonwebtoken");

module.exports = {
  getUserToken: function () {
    let token = localStorage.getItem("iottoken");
    return token;
  },
  getUserInfo: function () {
    let token = localStorage.getItem("iottoken");
    let decoded = jwt.decode(token);
    return decoded;
  },
  getLoginMessages: function (context) {
    return context.loginMessages;
  },
  getRegisterMessages: function (context) {
    return context.registerMessages;
  },
  getNotifications: function (context) {
    return context.notifications;
  },
};
