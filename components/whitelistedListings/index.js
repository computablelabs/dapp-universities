import React from 'react';
import PropTypes from 'prop-types';

import Listing from './listing';
import Container from './container';

class WhitelistedListings extends React.Component {
  render() {
    const { listings, onRemoveListing } = this.props;

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

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {
              listings.map((listing, idx) => (
                <tr key={idx}>
                  <Listing
                    key={idx}
                    listingHash={listing.listingHash}
                    owner={listing.owner}
                    name={listing.data.value.name}
                    rank={listing.data.value.rank}
                    onRemoveListing={onRemoveListing}
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

WhitelistedListings.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.object),
  onRemoveListing: PropTypes.func,
};

WhitelistedListings.defaultProps = {
  listings: [],
  onRemoveListing: () => {},
};

export default Container(WhitelistedListings);

