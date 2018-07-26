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

// Local Imports
import { initializeStore } from '../store';

const { publicRuntimeConfig: config } = getConfig();

class AppWrapper extends App {
  constructor(props) {
    super(props);

    this.loadAccounts = this.loadAccounts.bind(this);

    const { store } = props;
    store.dispatch(setWebsocketAddress(config.ganacheUrl));

    this.loadAccounts({ dispatch: store.dispatch });

    this.state = {
      account: undefined,
    };
  }

  async loadAccounts({ dispatch }) {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ganacheUrl));
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    dispatch(participate('Mr Admin Pants IV', account));

    this.setState({
      account,
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;

    const componentProps = {
      ...pageProps,
      account: this.state.account,
    };

    return (
      <Container>
        <Provider store={store}>
          <Component {...componentProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(AppWrapper);

