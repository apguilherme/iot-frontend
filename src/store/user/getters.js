module.exports = {
  getUserToken: function (context) {
    return context.userToken;
  },
  getUserInfo: function (context) {
    return context.userInfo;
  },
  getLoginMessages: function (context) {
    return context.loginMessages;
  },
  getRegisterMessages: function (context) {
    return context.registerMessages;
  },
};
