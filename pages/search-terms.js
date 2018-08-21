import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getApplications } from 'reputable/dist/redux/selectors';

import { Header } from '../components';

class Listings extends React.Component {
  render() {
    const { applications } = this.props;

    return (
      <div>
        <Header />
        <h1>Search Terms</h1>

        <div className="record-container">
          {
            applications.map((listing, idx) => (
              <div key={idx} className="record">
                {listing.listing}
              </div>
            ))
          }
        </div>
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

const mapStateToProps = (state) => ({
  applications: getApplications(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);

