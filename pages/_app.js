// Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

// Next Dependencies
import App, { Container } from 'next/app';

// Local Imports
import '../helpers/logging';
import { initializeStore } from '../store';
import { initializeDataMarketplace } from '../helpers';

class AppWrapper extends App {
  constructor(props) {
    super(props);

    this.initialize();
  }

  async initialize() {
    const { store } = this.props;

    await initializeDataMarketplace(store.dispatch);
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

