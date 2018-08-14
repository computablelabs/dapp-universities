import React from 'react';
import Link from 'next/link';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Link href="/">
          <a>Add University</a>
        </Link>
        <Link href="/listings">
          <a>View Universities</a>
        </Link>
      </div>
    );
  }
}

export default Header;

