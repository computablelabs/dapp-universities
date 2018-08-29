// Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import UUID from 'uuid';

// Next Dependencies
import App, { Container } from 'next/app';
import getConfig from 'next/config';

// Reputable Dependencies
import { getWeb3 } from 'reputable/dist/initializers';
import { setWebsocketAddress } from 'reputable/dist/redux/action-creators/web3';
import { participate } from 'reputable/dist/redux/action-creators/participants';
import { deployToken, approve, transfer } from 'reputable/dist/redux/action-creators/token';
import { deployDll } from 'reputable/dist/redux/action-creators/dll';
import { deployAttributeStore } from 'reputable/dist/redux/action-creators/attribute-store';
import { deployVoting } from 'reputable/dist/redux/action-creators/voting';
import { deployParameterizer } from 'reputable/dist/redux/action-creators/parameterizer';
import { deployRegistry, apply } from 'reputable/dist/redux/action-creators/registry';

// Local Imports
import { initializeStore } from '../store';

const { publicRuntimeConfig: config } = getConfig();

const initializeBlockchain = async ({ dispatch }) => {
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

  await dispatch(setWebsocketAddress(config.ganacheUrl));
  const web3 = await getWeb3(config.ganacheUrl);
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
  const parameterizerAddress = await dispatch(deployParameterizer());

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

  await dispatch(apply({
    listing: getListingHash(),
    userAddress: voterAccount,
    deposit: 100,
    data: JSON.stringify({
      name: 'Deep Springs College',
      rank: getRank(),
    }),
  }));
  await dispatch(apply({
    listing: getListingHash(),
    userAddress: voterAccount,
    deposit: 100,
    data: JSON.stringify({
      name: 'Maharishi University',
      rank: getRank(),
    }),
  }));
  await dispatch(apply({
    listing: getListingHash(),
    userAddress: voterAccount,
    deposit: 100,
    data: JSON.stringify({
      name: 'Naropa University',
      rank: getRank(),
    }),
  }));
  await dispatch(apply({
    listing: getListingHash(),
    userAddress: voterAccount,
    deposit: 100,
    data: JSON.stringify({
      name: 'Bard College at Simon’s Rock',
      rank: getRank(),
    }),
  }));
  await dispatch(apply({
    listing: getListingHash(),
    userAddress: voterAccount,
    deposit: 100,
    data: JSON.stringify({
      name: 'Antioch College',
      rank: getRank(),
    }),
  }));
};

class AppWrapper extends App {
  constructor(props) {
    super(props);

    this.initialize();
  }

  async initialize() {
    const { store } = this.props;

    await initializeBlockchain({
      dispatch: store.dispatch,
      getState: store.getState,
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(AppWrapper);

