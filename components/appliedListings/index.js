import React from 'react';
import PropTypes from 'prop-types';

import Listing from './listing';
import Container from './container';

class AppliedListings extends React.Component {
  renderCurrentDateTime() {
    const now = new Date();

    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }

  render() {
    const {
      listings,
      onUpdateListingStatus,
      onChallengeListing,
    } = this.props;

    return (
      <div>
        <style jsx>
          {`
            table {
              max-width: 600px;
              margin: 0 auto;
            }

            th {
              text-align: center;
            }

            th:first-child {
              width: 250px;
            }
          `}
        </style>

        <h3>{this.renderCurrentDateTime()}</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Applicant Expiration Time</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {
              listings.map((listing) => (
                <tr key={listing.listingHash}>
                  <Listing
                    listingHash={listing.listingHash}
                    name={listing.data.value.name}
                    rank={listing.data.value.rank}
                    applicationExpiry={listing.applicationExpiry}
                    onUpdateListingStatus={onUpdateListingStatus}
                    onChallengeListing={onChallengeListing}
                  />
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

AppliedListings.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.object),
  onUpdateListingStatus: PropTypes.func,
  onChallengeListing: PropTypes.func,
};

AppliedListings.defaultProps = {
  listings: [],
  onUpdateListingStatus: () => {},
  onChallengeListing: () => {},
};

export default Container(AppliedListings);

