import React from 'react';
import PropTypes from 'prop-types';

class Listing extends React.Component {
  constructor() {
    super();

    this.handleUpdateListingStatus = this.handleUpdateListingStatus.bind(this);
    this.handleChallengeListing = this.handleChallengeListing.bind(this);
  }

  handleUpdateListingStatus() {
    const { listingHash, onUpdateListingStatus } = this.props;

    onUpdateListingStatus(listingHash);
  }

  handleChallengeListing() {
    const { listingHash, onChallengeListing } = this.props;

    onChallengeListing(listingHash);
  }

  render() {
    const {
      name,
      rank,
      applicationExpiry,
    } = this.props;

    const canChallenge = Date.now() < applicationExpiry * 1000;

    return (
      <React.Fragment>
        <style jsx>
          {`
            .align-left {
              text-align: left;
            }

            .align-center {
              text-align: center;
            }

            .align-right {
              text-align: right;
            }
          `}
        </style>

        <td className="align-left">{name}</td>
        <td className="align-right">{rank}</td>
        <td className="align-center">
          <button
            onClick={canChallenge ?
              this.handleChallengeListing :
              this.handleUpdateListingStatus
            }
          >
            { canChallenge ? 'Challenge' : 'Update Status' }
          </button>
        </td>
      </React.Fragment>
    );
  }
}

Listing.propTypes = {
  listingHash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  applicationExpiry: PropTypes.string.isRequired,
  onUpdateListingStatus: PropTypes.func,
  onChallengeListing: PropTypes.func,
};

Listing.defaultProps = {
  onUpdateListingStatus: () => {},
  onChallengeListing: () => {},
};

export default Listing;

