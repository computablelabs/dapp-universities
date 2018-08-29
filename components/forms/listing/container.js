import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UUID from 'uuid/v4';

import { apply } from 'reputable/dist/redux/action-creators/registry';
import { getParticipants } from 'reputable/dist/redux/selectors';

import { IPFS } from '../../../initializers';

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

    async handleSubmit({ name, rank }) {
      const { dispatch, participants } = this.props;

      const data = { name, rank };
      const buffer = Buffer.from(JSON.stringify(data));
      const ipfsBlock = await IPFS.block.put(buffer);

      const listing = UUID().replace(/-/g, '');
      const userAddress = participants.length ? participants[1].address : '';
      const cid = ipfsBlock.cid.toBaseEncodedString();

      dispatch(apply({
        listing,
        userAddress,
        deposit: 100,
        data: cid,
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

