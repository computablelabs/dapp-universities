// Dependencies
import UUID from 'uuid';

// Reputable Dependencies
import { DataSources } from 'reputable/dist/constants';
import { getWeb3 } from 'reputable/dist/initializers';
import { setWebsocketAddress } from 'reputable/dist/redux/action-creators/web3';
import { participate } from 'reputable/dist/redux/action-creators/participants';
import { deployToken, approve, transfer } from 'reputable/dist/redux/action-creators/token';
import { deployDll } from 'reputable/dist/redux/action-creators/dll';
import { deployAttributeStore } from 'reputable/dist/redux/action-creators/attribute-store';
import { deployVoting } from 'reputable/dist/redux/action-creators/voting';
import { deployParameterizer } from 'reputable/dist/redux/action-creators/parameterizer';
import { deployRegistry, applyListing } from 'reputable/dist/redux/action-creators/registry';

// Local Dependencies
import {
  APPLY_STAGE_LENGTH,
  COMMIT_STAGE_LENGTH,
  REVEAL_STAGE_LENGTH,
} from '../constants';

const SeedUniversities = [
  'Deep Springs College',
  'Maharishi University',
  'Naropa University',
  'Bard College at Simon’s Rock',
  'Antioch College',
];

const initializeDataMarketplace = async (dispatch) => {
  /* ***
   *
   * Application Dependencies (blockchain)
   * - Token
   * - DLL
   * - Attribute Store
   * - Voting Contract
   * - Parameterizer
   * - Registry
   *
   * *** */

  await dispatch(setWebsocketAddress(process.env.GANACHE_URL));
  const web3 = await getWeb3(process.env.GANACHE_URL);
  const accounts = await web3.eth.getAccounts();
  const ownerAccount = accounts[0];
  const challengerAccount = accounts[1];
  const voterAccount = accounts[2];

  // TODO(geoff)
  //   There needs to be a central data store somewhere that tracks
  //   - what has been deployed
  //   - what the deployed addresses are
  //   - which user addresses have been allocated

  // TODO(geoff) Guard: Is this user already a participant?
  await dispatch(participate('Mr Admin Pants IV', ownerAccount));
  await dispatch(participate('Voter', voterAccount));
  await dispatch(participate('Challenger', challengerAccount));

  // deploy Token for User
  const tokenAddress = await dispatch(deployToken());

  // deploy DLL
  const dllAddress = await dispatch(deployDll());

  // deploy Attribute Store
  const attributeStoreAddress = await dispatch(deployAttributeStore());

  // deploy Voting Contract
  const votingAddress = await dispatch(deployVoting());

  // deploy Parameterizer
  await dispatch(deployParameterizer({
    applyStageLen: APPLY_STAGE_LENGTH,
    commitStageLen: COMMIT_STAGE_LENGTH,
    revealStageLen: REVEAL_STAGE_LENGTH,
  }));

  // deploy Registry
  const registryAddress = await dispatch(deployRegistry('registry'));

  // approve registry -- owner approves amount to spend
  await dispatch(approve({
    address: registryAddress,
    amount: 1 * 1000 * 1000,
    from: ownerAccount,
  }));

  // approve voting -- owner approves amount to spend
  await dispatch(approve({
    address: votingAddress,
    amount: 1 * 1000 * 1000,
    from: ownerAccount,
  }));

  // fund accounts
  await dispatch(transfer({
    to: challengerAccount,
    amount: 50 * 1000,
  }));
  await dispatch(transfer({
    to: voterAccount,
    amount: 50 * 1000,
  }));

  // registry approval to spend on behalf of the challenger
  await dispatch(approve({
    address: registryAddress,
    amount: 50 * 1000,
    from: voterAccount,
  }));
  await dispatch(approve({
    address: registryAddress,
    amount: 50 * 1000,
    from: challengerAccount,
  }));

  // voting approval for voter
  // await dispatch(approve(votingAddress, 450 * 1000, { from: voterAccount }));

  // apply listing to registry
  const getListingHash = () => UUID().replace(/-/g, '');
  const getRank = () => Math.floor(Math.random() * 20);

  SeedUniversities.map(async (universityName) => {
    dispatch(
      applyListing({
        listing: getListingHash(),
        userAddress: voterAccount,
        deposit: 100,
        data: {
          source: DataSources.IPFS,
          value: {
            name: universityName,
            rank: getRank(),
          },
        },
      })
    );
  });
};

export { initializeDataMarketplace };

