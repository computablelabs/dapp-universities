import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getApplications } from 'reputable/dist/redux/selectors';

const mapStateToProps = (state) => ({
  applications: getApplications(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

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

