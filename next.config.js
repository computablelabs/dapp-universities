require('dotenv').config();

module.exports = {
  // Server Only
  serverRuntimeConfig: {

  },
  // Client + Server
  publicRuntimeConfig: {
    ganacheUrl: process.env.GANACHE_URL,
  },
};

