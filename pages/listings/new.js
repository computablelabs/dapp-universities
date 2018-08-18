import React from 'react';
import Router from 'next/router';

import { ListingForm } from '../../components';

class ListingsPage extends React.Component {
  constructor() {
    super();

    this.handleAfterSubmit = this.handleAfterSubmit.bind(this);
  }

  handleAfterSubmit() {
    Router.push('/listings');
  }

  render() {
    return (
      <div>
        <ListingForm afterSubmit={this.onAfterSubmit} />
      </div>
    );
  }
}

export default ListingsPage;

