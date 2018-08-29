import React from 'react';
import Link from 'next/link';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    );
  }
}

export default Header;

