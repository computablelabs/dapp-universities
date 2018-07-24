// Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

// Next Dependencies
import App, { Container } from 'next/app';
import getConfig from 'next/config';

// Reputable Dependencies
import { setWebsocketAddress } from 'reputable/dist/redux/action-creators/web3';

// Local Imports
import { initializeStore } from '../store';

const { publicRuntimeConfig: config } = getConfig();

class AppWrapper extends App {
  componentDidMount() {
    const { store } = this.props;
    store.dispatch(setWebsocketAddress(config.ganacheUrl));
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

