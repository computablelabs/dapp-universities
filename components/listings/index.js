import React from 'react';
import PropTypes from 'prop-types';

import Container from './container';

class Listings extends React.Component {
  render() {
    const { applicants } = this.props;

    return (
      <div>
        <h1>Listings</h1>
        {
          applicants.map((application, idx) => (
            <div key={idx}>{application.listing}</div>
          ))
        }
      </div>
    );
  }
}

Listings.propTypes = {
  applicants: PropTypes.arrayOf(PropTypes.object),
};

Listings.defaultProps = {
  applicants: [],
};

export default Container(Listings);

