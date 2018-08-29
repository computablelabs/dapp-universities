import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { apply } from 'reputable/dist/redux/action-creators/registry';
import { getParticipants } from 'reputable/dist/redux/selectors';

const mapStateToProps = (state) => ({
  participants: getParticipants(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const createContainer = (ComposedComponent) => {
  class Container extends React.Component {
    constructor() {
      super();

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({ name }) {
      const { dispatch, participants } = this.props;

      const listing = name;
      const userAddress = participants.length ? participants[1].address : '';

      dispatch(apply({
        listing,
        userAddress,
        deposit: 100,
      }));
    }

    render() {
      const {
        dispatch,
        participants,
        ...props
      } = this.props;

      const componentProps = {
        ...props,
        onSubmit: this.handleSubmit,
      };

      return (
        <ComposedComponent {...componentProps} />
      );
    }
  }

  Container.propTypes = {
    dispatch: PropTypes.func.isRequired,
    participants: PropTypes.arrayOf(PropTypes.object),
  };

  Container.defaultProps = {
    participants: [],
  };

  let Component = connect()(Container);
  Component = connect(mapStateToProps, mapDispatchToProps)(Component);

  return Component;
};

export default createContainer;

