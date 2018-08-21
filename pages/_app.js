// Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Web3 from 'web3';

// Next Dependencies
import App, { Container } from 'next/app';
import getConfig from 'next/config';

// Reputable Dependencies
import { setWebsocketAddress } from 'reputable/dist/redux/action-creators/web3';
import { participate } from 'reputable/dist/redux/action-creators/participant';

import { deployToken, approve, transfer } from 'reputable/dist/redux/action-creators/token';
import { deployDll } from 'reputable/dist/redux/action-creators/dll';
import { deployAttributeStore } from 'reputable/dist/redux/action-creators/attribute-store';
import { deployVoting } from 'reputable/dist/redux/action-creators/voting';
import { deployParameterizer } from 'reputable/dist/redux/action-creators/parameterizer';
import { deployRegistry } from 'reputable/dist/redux/action-creators/registry';

// Local Imports
import { initializeStore } from '../store';

const { publicRuntimeConfig: config } = getConfig();

const initializeBlockchain = async ({ dispatch }) => {
  dispatch(setWebsocketAddress(config.ganacheUrl));

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

  const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ganacheUrl));
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
  dispatch(participate('Mr Admin Pants IV', ownerAccount));
  dispatch(participate('Voter', voterAccount));
  dispatch(participate('Challenger', challengerAccount));

  // deploy Token for User
  const tokenAddress = await dispatch(deployToken(ownerAccount));

  // deploy DLL
  const dllAddress = await dispatch(deployDll(ownerAccount));

  // deploy Attribute Store
  const attributeStoreAddress = await dispatch(deployAttributeStore(ownerAccount));

  // deploy Voting Contract
  const votingAddress = await dispatch(deployVoting(ownerAccount));

  // deploy Parameterizer
  const parameterizerAddress = await dispatch(deployParameterizer(ownerAccount));

  // deploy Registry
  const registryAddress = await dispatch(deployRegistry('registry', ownerAccount));

  // approve registry -- owner approves amount to spend
  await dispatch(approve(registryAddress, 1 * 1000 * 1000, ownerAccount));

  // approve voting -- owner approves amount to spend
  await dispatch(approve(votingAddress, 1 * 1000 * 1000, ownerAccount));

  // fund accounts
  await dispatch(transfer(challengerAccount, 50 * 1000));
  await dispatch(transfer(voterAccount, 50 * 1000));

  // registry approval to spend on behalf of the challenger
  await dispatch(approve(registryAddress, 50 * 1000, voterAccount));
  await dispatch(approve(registryAddress, 50 * 1000, challengerAccount));
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

