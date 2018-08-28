import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { apply } from 'reputable/dist/redux/action-creators/registry';
import { getParticipants } from 'reputable/dist/redux/selectors';

const mapStateToProps = (state) => ({
  participants: getParticipants(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  submitApplication: apply,
}, dispatch);

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

