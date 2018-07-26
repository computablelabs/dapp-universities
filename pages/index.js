import React from 'react';
import { connect } from 'react-redux';

import { address as getAddress } from 'reputable/dist/redux/selectors/token';

import { Header } from '../components';

class Page extends React.Component {
  static async getInitialProps({ ctx }) {
    console.log('index fetch initial props: ', ctx);

    return {};
  }

  componentDidMount() {
    console.log('index mounted: ', this.props);
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Next.js App</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  address: getAddress(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

