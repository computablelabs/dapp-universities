import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';

import { apply } from 'reputable/dist/redux/action-creators/registry';
import { getParticipants, getRegistryAddress } from 'reputable/dist/redux/selectors';

import { Header } from '../components';

class Page extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const {
      registryAddress,
      participants,
      submitApplication,
    } = this.props;

    const userAddress = participants.length ? participants[1].address : '';

    const formData = new FormData(e.target);
    const value = formData.get('value');

    await submitApplication(registryAddress, value, userAddress, 100);
    Router.push('/listings');
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Enter a search query</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="value" />
          <button type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

Page.propTypes = {
  registryAddress: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.object),
  submitApplication: PropTypes.func,
};

Page.defaultProps = {
  registryAddress: '',
  participants: [],
  submitApplication: () => {},
};

const mapStateToProps = (state) => ({
  registryAddress: getRegistryAddress(state),
  participants: getParticipants(state),
});

const mapDispatchToProps = {
  submitApplication: apply,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

