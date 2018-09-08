import React from 'react';
import PropTypes from 'prop-types';

import Listing from './listing';
import Container from './container';

class WhitelistedListings extends React.Component {
  render() {
    const { listings } = this.props;

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
            </tr>
          </thead>

          <tbody>
            {
              listings.map((listing, idx) => (
                <tr key={idx}>
                  <Listing key={idx} {...listing.data.value} />
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
};

WhitelistedListings.defaultProps = {
  listings: [],
};

export default Container(WhitelistedListings);

