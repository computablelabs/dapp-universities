// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

// Reputable Dependencies
import { updateListingStatus, challengeListing } from '@computable/reputable/dist/redux/action-creators';
import { getParticipants, getAppliedListings } from '@computable/reputable/dist/redux/selectors';

const mapStateToProps = (state, props) => {
  const participants = getParticipants(state);
  let listings = getAppliedListings(state);

  if (props.sortBy) {
    const sort = (a, b) => {
      const attr = props.sortBy;
      const attr1 = a.data.value[attr];
      const attr2 = b.data.value[attr];

      if (attr1 < attr2) {
        return -1;
      }

      if (attr1 > attr2) {
        return 1;
      }

      return 0;
    };

    listings = listings.sort(sort);
  }

  if (props.limit) {
    listings = listings.slice(0, props.limit);
  }

  return { participants, listings };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({}, dispatch)
);

const createContainer = (ComposedComponent) => {
  class Container extends React.Component {
    constructor() {
      super();

      this.handleUpdateListingStatus = this.handleUpdateListingStatus.bind(this);
      this.handleChallengeListing = this.handleChallengeListing.bind(this);
    }

    async handleUpdateListingStatus(listingHash) {
      const { dispatch, listings } = this.props;

      const listing = listings.find((item) => item.listingHash === listingHash);
      const { name } = listing.data.value;

      const response = await dispatch(
        updateListingStatus(listingHash)
      );

      if (response) {
        console.demo('Updated listing status: ', name);
      }

      if (response && response.whitelisted) {
        console.demo('Whitelisted: ', name);
      } else if (response) {
        console.demo('Removed: ', name);
      }
    }

    async handleChallengeListing(listingHash) {
      const { dispatch, participants, listings } = this.props;

      const challenger = participants[2];

      await dispatch(
        challengeListing({ listingHash, challenger: challenger.address })
      );

      const listing = listings.find((item) => item.listingHash === listingHash);
      console.demo('Challenged listing: ', listing.data.value.name);

      Router.push('/listings/whitelisted');
    }

    render() {
      const componentProps = {
        ...this.props,
        onChallengeListing: this.handleChallengeListing,
        onUpdateListingStatus: this.handleUpdateListingStatus,
      };

      return (
        <ComposedComponent {...componentProps} />
      );
    }
  }

  Container.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  let Component = connect()(Container);
  Component = connect(mapStateToProps, mapDispatchToProps)(Component);

  return Component;
};

export default createContainer;

