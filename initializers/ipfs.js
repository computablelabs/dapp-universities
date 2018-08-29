import IPFS from 'ipfs-api';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

const ipfs = IPFS(config.ipfs.domain, config.ipfs.port, {
  protocol: config.ipfs.protocol,
});

export default ipfs;

