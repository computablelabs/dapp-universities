import React from 'react';
import PropTypes from 'prop-types';

import { IPFSRead } from '../../../initializers/ipfs';

class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      rank: '',
    };

    this.parseData(props.dataHash);
  }

  componentWillReceiveProps(props) {
    const { dataHash } = props;

    this.parseData(dataHash);
  }

  async parseData(data) {
    if (!data) {
      return;
    }

    const { name, rank } = await IPFSRead(data);

    this.setState({ name, rank });
  }

  render() {
    return (
      <React.Fragment>
        <style jsx>
          {`
            td:first-child {
              text-align: left;
            }

            td:last-child {
              text-align: right;
            }
          `}
        </style>

        <td>{this.state.name}</td>
        <td>{this.state.rank}</td>
      </React.Fragment>
    );
  }
}

Listing.propTypes = {
  dataHash: PropTypes.string.isRequired,
};

export default Listing;

