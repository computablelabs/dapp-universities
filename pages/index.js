import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { apply } from 'reputable/dist/redux/action-creators/registry';
import { getParticipants, getRegistryAddress } from 'reputable/dist/redux/selectors';

import { Header } from '../components';

class Page extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      registryAddress,
      participants,
      submitApplication,
    } = this.props;

    const userAddress = participants.length ? participants[1].address : '';

    const formData = new FormData(e.target);
    const value = formData.get('university');

    submitApplication(registryAddress, value, userAddress, 100);
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Enter the name of your university</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="university" />
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

