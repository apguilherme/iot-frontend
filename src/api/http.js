const axios = require("axios");

const HTTP = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: "Bearer {token}",
  },
});

module.exports = HTTP;
