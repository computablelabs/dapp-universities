import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeListing } from '@computable/reputable/dist/redux/action-creators';
import { getWhitelistedListings } from '@computable/reputable/dist/redux/selectors';

const mapStateToProps = (state, props) => {
  let listings = getWhitelistedListings(state);

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

  return { listings };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({}, dispatch)
);

const createContainer = (ComposedComponent) => {
  class Container extends React.Component {
    constructor() {
      super();

      this.handleRemoveListing = this.handleRemoveListing.bind(this);
    }

    async handleRemoveListing({ listingHash, name, userAddress }) {
      const { dispatch } = this.props;

      console.demo('Listing removed: ', name);

      await dispatch(
        removeListing({
          listing: listingHash,
          userAddress,
        })
      );
    }

    render() {
      const componentProps = {
        ...this.props,
        onRemoveListing: this.handleRemoveListing,
      };

      return (
        <ComposedComponent {...componentProps} />
      );
    }
  }

  let Component = connect()(Container);
  Component = connect(mapStateToProps, mapDispatchToProps)(Component);

  return Component;
};

export default createContainer;

