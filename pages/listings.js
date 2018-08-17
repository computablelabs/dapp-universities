import React from 'react';

import { Header, Listings } from '../components';

class ListingsPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Listings />
      </div>
    );
  }
}

export default ListingsPage;

