import React from 'react';
import PropTypes from 'prop-types';

import Container from './container';

class Listings extends React.Component {
  render() {
    const { applications } = this.props;

    return (
      <div>
        <h1>Listings</h1>
        {
          applications.map((application, idx) => (
            <div key={idx}>{application.listing}</div>
          ))
        }
      </div>
    );
  }
}

Listings.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.object),
};

Listings.defaultProps = {
  applications: [],
};

export default Container(Listings);

