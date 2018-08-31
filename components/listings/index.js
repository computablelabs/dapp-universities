import React from 'react';
import PropTypes from 'prop-types';

import Listing from './listing';
import Container from './container';

class Listings extends React.Component {
  render() {
    const { applicants } = this.props;

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
              applicants.map((applicant, idx) => (
                <tr key={idx}>
                  <Listing key={idx} {...applicant.data.value} />
                </tr>
              ))
            }
          </tbody>
        </table>
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

