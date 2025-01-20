const axios = require("axios");
require("dotenv").config();

const axiosInstanxe = axios.create({
  baseURL: " https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS}`
  },
});

module.exports = axiosInstanxe;
