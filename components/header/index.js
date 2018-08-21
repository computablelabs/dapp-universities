import React from 'react';
import { Link } from '../../routes';

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
          <Link href="/" prefetch>
            <a>Search</a>
          </Link>
          <Link href="/listings" prefetch>
            <a>Search Results</a>
          </Link>
          <Link href="/search-terms" prefetch>
            <a>Search Terms</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;

