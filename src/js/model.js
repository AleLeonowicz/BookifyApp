import { API_URL, RES_PER_PAGE } from './config.js';
import * as firebaseUtils from './firebase.js';

export let state = {
  data: [],
  favourites: [],
  toRead: [],
};

export const setState = function (newState, key) {
  state[key] = newState;
};

/////////////////////////////////////////////////////////////////////////////////////////

export const addToFavouritesState = function () {
  if (state.favourites.includes(state.selectedResult.selfLink)) {
    let index = state.favourites.indexOf(state.selectedResult.selfLink);
    state.favourites.splice(index, 1);
    console.log(
      'Removed element from: model.state.favourites',
      state.favourites
    );
  } else {
    state.favourites.push(state.selectedResult.selfLink);
    console.log('Added element to: model.state.favourites', state.favourites);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

export const setStateFavourites = async function () {
  const usersFavourites = await firebaseUtils.getDocuments(
    'favourites',
    state.userId
  );

  if (!usersFavourites) {
    console.log("No user's favourites books yet");
    return;
  } else {
    setState(usersFavourites, 'favourites');
  }
};
