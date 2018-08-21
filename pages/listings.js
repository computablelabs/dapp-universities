import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { Header } from '../components';

class Listings extends React.Component {
  constructor() {
    super();

    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  async handleSearch() {
    const term = this.props.router.query.query;

    const response = await fetch(`/search/${term}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    console.log('response: ', responseJson);

    this.setState({ results: responseJson.response.records });
  }

  render() {
    return (
      <div>
        <style jsx>
          {`
            table {
              max-width: 600px;
              margin: 0 auto;
            }

            td {
              width: 100px;
              text-align: center;
            }
          `}
        </style>

        <Header />
        <h1>Search Results</h1>

        <table>
          <thead>
            <tr>
              <th>RSID</th>
              <th>Chromosome</th>
              <th>Position</th>
              <th>Genotype</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.results.map((record, idx) => (
                <tr key={idx}>
                  <td>{record.rsid}</td>
                  <td>{record.chromosome}</td>
                  <td>{record.position}</td>
                  <td>{record.genotype}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Listings.propTypes = {
  router: PropTypes.object.isRequired,
};
/* eslint-enable */

export default withRouter(Listings);

