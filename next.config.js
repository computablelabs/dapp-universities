require('dotenv').config();

module.exports = {
  // Server Only
  serverRuntimeConfig: {

  },
  // Client + Server
  publicRuntimeConfig: {
    ganacheUrl: process.env.GANACHE_URL,
    ipfs: {
      domain: process.env.IPFS_DOMAIN,
      port: process.env.IPFS_PORT,
      protocol: process.env.IPFS_PROTOCOL,
    },
  },
};

