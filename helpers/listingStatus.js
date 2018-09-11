import { updateListingStatus } from 'reputable/dist/redux/action-creators/registry';
import { getAppliedListings } from 'reputable/dist/redux/selectors';

const updateListings = ({ dispatch, getState }) => (
  () => {
    const state = getState();
    const listings = getAppliedListings(state);

    listings.forEach(
      (listing) => updateListing({ dispatch, listing })
    );
  }
);

const updateListing = async ({ dispatch, listing }) => {
  const now = Math.floor(Date.now() / 1000);
  const { applicationExpiry } = listing;
  const { name } = listing.data.value;

  if (now < applicationExpiry) {
    return;
  }

  const response = await dispatch(
    updateListingStatus(listing.listingHash)
  );

  console.demo('Updated listing status: ', name);

  if (response.whitelisted) {
    console.demo('Whitelisted: ', name);
  } else {
    console.demo('Removed: ', name);
  }
};

const initializeListingStatusPolling = ({ dispatch, getState }) => {
  console.demo('initializing listing status polling');

  setInterval(updateListings({ dispatch, getState }), 1000);
};

export { initializeListingStatusPolling };

