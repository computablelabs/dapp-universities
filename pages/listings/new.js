import React from 'react';
import Router from 'next/router';

import { Header, ListingForm } from '../../components';

class NewListingsPage extends React.Component {
  constructor() {
    super();

    this.handleAfterSubmit = this.handleAfterSubmit.bind(this);
  }

  handleAfterSubmit() {
    Router.push('/listings/applied');
  }

  render() {
    return (
      <div>
        <Header />
        <ListingForm onAfterSubmit={this.handleAfterSubmit} />
      </div>
    );
  }
}

export default NewListingsPage;

