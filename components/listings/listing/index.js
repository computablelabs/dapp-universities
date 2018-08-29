import React from 'react';
import PropTypes from 'prop-types';

class Listing extends React.Component {
  render() {
    const { name, rank } = this.props;

    return (
      <div>{name}</div>
    );
  }
}

Listing.propTypes = {
  name: PropTypes.string,
  rank: PropTypes.string,
};

Listing.defaultProps = {
  name: 'n/a',
  rank: 'n/a',
};

export default Listing;

