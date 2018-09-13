import React from 'react';
import PropTypes from 'prop-types';

class Listing extends React.Component {
  render() {
    const { name, rank } = this.props;

    return (
      <React.Fragment>
        <style jsx>
          {`
            td:first-child {
              text-align: left;
            }

            td:last-child {
              text-align: right;
            }
          `}
        </style>

        <td>{name}</td>
        <td>{rank}</td>
      </React.Fragment>
    );
  }
}

Listing.propTypes = {
  name: PropTypes.string.isRequired,
  rank: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Listing;

