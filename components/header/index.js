import React from 'react';
import Link from 'next/link';

class Header extends React.Component {
  render() {
    return (
      <div>
        <style jsx>
          {`
            .container > a:not(:last-child) {
              margin-right: 12px;
            }
          `}
        </style>

        <div className="container">
          <Link href="/">
            <a>Search</a>
          </Link>
          <Link href="/listings">
            <a>Search Results</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;

