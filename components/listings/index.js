import React from 'react';
import PropTypes from 'prop-types';

import Listing from './listing';
import Container from './container';

class Listings extends React.Component {
  render() {
    const { applicants } = this.props;

    return (
      <div>
        <h1>Listings</h1>
        {
          applicants.map((applicant, idx) => (
            <Listing key={idx} {...JSON.parse(applicant.data)} />
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

