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

export const addToState = function (collection) {
  if (state[collection].includes(state.selectedResult.selfLink)) {
    let index = state[collection].indexOf(state.selectedResult.selfLink);
    state[collection].splice(index, 1);
    console.log(
      `Removed element from: model.state.${collection}`,
      state[collection]
    );
  } else {
    state[collection].push(state.selectedResult.selfLink);
    console.log(
      `Added element to: model.state.${collection}`,
      state[collection]
    );
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

export const getStateFromDb = async function (collection) {
  const usersList = await firebaseUtils.getDocuments(collection, state.userId);
  if (!usersList) {
    return;
  } else {
    setState(usersList, collection);
  }
};
