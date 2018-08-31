import React from 'react';

import { Header, Listings } from '../../components';

const LIMIT = 5;

class NewListingPage extends React.Component {
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
        <h1>Listings</h1>

        <button className="btn-limit" onClick={this.handleLimitChange}>
          { this.state.limit ? 'All' : `Top ${LIMIT}` }
        </button>

        <Listings sortBy="rank" limit={this.state.limit} />
      </div>
    );
  }
}

export default NewListingPage;

