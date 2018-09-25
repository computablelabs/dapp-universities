// Dependencies
import UUID from 'uuid';

// Reputable Dependencies
import { getWeb3 } from '@computable/reputable/dist/initializers';
import ContractObserver from '@computable/reputable/dist/redux/observer';
import {
  setWebsocketAddress,
  deployToken,
  deployDll,
  deployAttributeStore,
  deployVoting,
  deployParameterizer,
  deployRegistry,
  addParticipant,
  applyListing,
  approve,
  transfer,
} from '@computable/reputable/dist/redux/action-creators';
import {
  getTokenAddress,
  getDllAddress,
  getAttributeStoreAddress,
  getVotingAddress,
  getParameterizerAddress,
  getRegistryAddress,
} from '@computable/reputable/dist/redux/selectors';

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

const initializeDataMarketplace = async (dispatch, getState) => {
  let state;

  console.demo('Initializing data marketplace');

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
  await dispatch(addParticipant('Mr Admin Pants IV', ownerAccount));
  console.demo('Added admin participant: ', ownerAccount);
  await dispatch(addParticipant('Voter', voterAccount));
  // console.demo('added participant voter: ', voterAccount);
  await dispatch(addParticipant('Challenger', challengerAccount));
  console.demo('Added challenger participant: ', challengerAccount);

  // deploy Token for User
  await dispatch(deployToken());
  state = getState();
  const tokenAddress = getTokenAddress(state);
  console.demo('Deployed Token Contract: ', tokenAddress);

  // deploy DLL
  await dispatch(deployDll());
  state = getState();
  const dllAddress = getDllAddress(state);
  console.demo('Deployed DLL Contract: ', dllAddress);

  // deploy Attribute Store
  await dispatch(deployAttributeStore());
  state = getState();
  const attributeStoreAddress = getAttributeStoreAddress(state);
  console.demo('Deployed Attribute Store Contract: ', attributeStoreAddress);

  // deploy Voting Contract
  await dispatch(deployVoting());
  state = getState();
  const votingAddress = getVotingAddress(state);
  console.demo('Deployed Voting Contract: ', votingAddress);

  // deploy Parameterizer
  await dispatch(deployParameterizer({
    applyStageLen: APPLY_STAGE_LENGTH,
    commitStageLen: COMMIT_STAGE_LENGTH,
    revealStageLen: REVEAL_STAGE_LENGTH,
  }));
  state = getState();
  const parameterizerAddress = getParameterizerAddress(state);
  console.demo('Deployed Paramterizer Contract: ', parameterizerAddress);

  // deploy Registry
  await dispatch(deployRegistry('registry'));
  state = getState();
  const registryAddress = getRegistryAddress(state);
  console.demo('Deployed Registry Contract: ', registryAddress);

  await ContractObserver.subscribe({ dispatch, getState });
  console.demo('Initialized Contract Observer');

  // approve registry -- owner approves amount to spend
  await dispatch(approve({
    address: registryAddress,
    amount: 1 * 1000 * 1000,
    from: ownerAccount,
  }));
  console.demo('Approved Registry Contract to spend tokens on behalf of the Owner');

  // approve voting -- owner approves amount to spend
  await dispatch(approve({
    address: votingAddress,
    amount: 1 * 1000 * 1000,
    from: ownerAccount,
  }));
  console.demo('Approved Voting Contract to spend tokens on behalf of the Owner');

  // fund accounts
  await dispatch(transfer({
    to: challengerAccount,
    amount: 50 * 1000,
  }));
  console.demo('Funded the Challenger account');
  await dispatch(transfer({
    to: voterAccount,
    amount: 50 * 1000,
  }));
  // console.demo('Funded the Voter account');

  // registry approval to spend on behalf of the challenger
  await dispatch(approve({
    address: registryAddress,
    amount: 50 * 1000,
    from: voterAccount,
  }));
  // console.demo('Approved the Registry Contract to spend tokens on behalf of the Voter');
  await dispatch(approve({
    address: registryAddress,
    amount: 50 * 1000,
    from: challengerAccount,
  }));
  console.demo('Approved the Registry Contract to spend tokens on behalf of the Challenger');

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
          value: {
            name: universityName,
            rank: getRank(),
          },
        },
      })
    );

    console.demo('Applied listing for: ', universityName);
  });
};

export { initializeDataMarketplace };

