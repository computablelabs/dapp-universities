import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getWhitelistedListings } from 'reputable/dist/redux/selectors';

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
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Container);
};

export default createContainer;

