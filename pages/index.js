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
            University Founder
          </a>
        </Link>

        <Link href="/listings">
          <a className="user-link">
            Student
          </a>
        </Link>

        <Link href="/">
          <a className="user-link">
            Reviewer
          </a>
        </Link>
      </div>
    );
  }
}

export default IndexPage;

