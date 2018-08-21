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
            .record-container {
              max-width: 600px;
              margin: 0 auto;
            }

            .record-header,
            .record {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
          `}
        </style>

        <Header />
        <h1>Search Results</h1>

        <div className="record-container">
          <div className="record-header">
            <div>RSID</div>
            <div>Chromosome</div>
            <div>Position</div>
            <div>Genotype</div>
          </div>

          {
            this.state.results.map((record, idx) => (
              <div key={idx} className="record">
                <div>{record.rsid}</div>
                <div>{record.chromosome}</div>
                <div>{record.position}</div>
                <div>{record.genotype}</div>
              </div>
            ))
          }
        </div>
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

