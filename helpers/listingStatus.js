import { updateListingStatus } from '@computable/reputable/dist/redux/action-creators';
import { getAppliedListings, getListing } from '@computable/reputable/dist/redux/selectors';

const updateListings = ({ dispatch, getState }) => (
  () => {
    const state = getState();
    const listings = getAppliedListings(state);

    listings.forEach(
      (listing) => updateListing({ dispatch, getState, listing })
    );
  }
);

const updateListing = async ({ dispatch, getState, listing }) => {
  const now = Math.floor(Date.now() / 1000);
  const { applicationExpiry } = listing;
  const { name } = listing.data.value;

  if (now < applicationExpiry) {
    return;
  }

  await dispatch(
    updateListingStatus(listing.listingHash)
  );
  const state = getState();
  const updatedListing = getListing(state, listing.listingHash);

  if (updatedListing && updatedListing.whitelisted) {
    console.demo('Updated listing status: ', name);
    console.demo('Whitelisted: ', name);
  }
};

const initializeListingStatusPolling = ({ dispatch, getState }) => {
  console.demo('Initializing listing status polling');

  setInterval(updateListings({ dispatch, getState }), 1000);
};

export { initializeListingStatusPolling };

