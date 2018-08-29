import IPFS from './ipfs';

const IPFSWrite = async (data) => {
  const buffer = Buffer.from(JSON.stringify(data));
  const ipfsBlock = await IPFS.block.put(buffer);
  const cid = ipfsBlock.cid.toBaseEncodedString();

  return cid;
};

const IPFSRead = async (cid) => {
  const block = await IPFS.block.get(cid);
  const dataString = block.data.toString();
  const data = JSON.parse(dataString);

  return data;
};

export { IPFSWrite, IPFSRead };

