const axios = require("axios");
const VUE_APP_BACKEND_URL = process.env.VUE_APP_BACKEND_URL;

const HTTP = axios.create({
  baseURL: `${VUE_APP_BACKEND_URL}`,
  headers: {
    token: localStorage.getItem("iottoken"),
  },
});

module.exports = HTTP;
