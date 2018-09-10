import React from 'react';
import Link from 'next/link';

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <style jsx>
          {`
            .user-link {
              display: block;
            }
          `}
        </style>

        <Link href="/listings/new">
          <a className="user-link">
            University Founder (Apply)
          </a>
        </Link>

        <Link href="/listings/whitelisted">
          <a className="user-link">
            Student (View Listings)
          </a>
        </Link>

        <Link href="/listings/applied">
          <a className="user-link">
            Reviewer (View/Challenge Applicants)
          </a>
        </Link>
      </div>
    );
  }
}

export default IndexPage;

