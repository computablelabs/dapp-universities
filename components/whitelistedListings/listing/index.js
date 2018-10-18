import React from 'react';
import PropTypes from 'prop-types';

class Listing extends React.Component {
  constructor() {
    super();

    this.handleRemoveListing = this.handleRemoveListing.bind(this);
  }

  handleRemoveListing() {
    const {
      listingHash,
      owner,
      name,
      onRemoveListing,
    } = this.props;

    // Note:
    //   This should be the current user's address, not the listing's owner.
    //   Since this is a single user system, we are skipping this validation.
    onRemoveListing({
      listingHash,
      userAddress: owner,
      name,
    });
  }

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
        <td>
          {
            true && (
              <button onClick={this.handleRemoveListing}>
                Remove
              </button>
            )
          }
        </td>
      </React.Fragment>
    );
  }
}

Listing.propTypes = {
  listingHash: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onRemoveListing: PropTypes.func,
};

Listing.defaultProps = {
  onRemoveListing: () => {},
};

export default Listing;

