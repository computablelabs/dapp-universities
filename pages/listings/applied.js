import React from 'react';

import { Header, AppliedListings } from '../../components';

const LIMIT = 5;

class AppliedListingsPage extends React.Component {
  constructor() {
    super();

    this.handleLimitChange = this.handleLimitChange.bind(this);

    this.state = {
      limit: undefined,
    };
  }

  handleLimitChange(e) {
    e.preventDefault();

    const limit = this.state.limit ? undefined : LIMIT;

    this.setState({ limit });
  }

  render() {
    return (
      <div>
        <style jsx>
          {`
            .btn-limit {
              display: block;
              margin: 0 auto 18px;
            }
          `}
        </style>

        <Header />
        <h1>Applied Listings</h1>

        <button className="btn-limit" onClick={this.handleLimitChange}>
          { this.state.limit ? `Top ${LIMIT}` : 'All' }
        </button>

        <AppliedListings sortBy="rank" limit={this.state.limit} />
      </div>
    );
  }
}

export default AppliedListingsPage;

