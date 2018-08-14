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

const mapStateToProps = (state) => ({
  applications: getApplications(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);

