import { API_URL, RES_PER_PAGE } from './config.js';
import * as firebaseUtils from './firebase.js';
import * as helpers from './helpers.js';

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export let state = {
  data: [],
  favourites: [],
  toRead: [],
  favouritesList: [],
  toReadList: [],
};

export const setState = function (newState, key) {
  state[key] = newState;
};

/////////////////////////////////////////////////////////////////////////////////////////

// reconcile state after auth update
export const reconcileUserState = function (isLoggedIn, userId) {
  setState(isLoggedIn, 'isLoggedIn');
  setState(userId, 'userId');
};

export const cleanState = function () {
  setState([], 'favourites');
  setState([], 'toRead');
  setState([], 'toReadList');
  setState([], 'favouritesList');
};

/////////////////////////////////////////////////////////////////////////////////////////

export const addToState = async function (collection1, collection2) {
  try {
    if (state[collection1].includes(state.selectedResult.selfLink)) {
      let index = state[collection1].indexOf(state.selectedResult.selfLink);
      state[collection1].splice(index, 1);
      // console.log(
      //   `Removed element from: model.state.${collection1}`,
      //   state[collection1]
      // );
      const filteredBooks = state[collection2].filter(
        book => book.selfLink !== state.selectedResult.selfLink
      );
      setState(filteredBooks, collection2);
    } else {
      state[collection1].push(state.selectedResult.selfLink);
      // console.log(
      //   `Added element to: model.state.${collection1}`,
      //   state[collection1]
      // );
      const addedBook = await helpers.getJSON(state.selectedResult.selfLink);
      state[collection2].push(addedBook);
    }
  } catch (err) {
    throw err;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

export const getStateFromDb = async function (collection) {
  try {
    const usersList = await firebaseUtils.getDocuments(
      collection,
      state.userId
    );
    if (!usersList) {
      return;
    } else {
      setState(usersList, collection);
    }
  } catch (err) {
    throw err;
  }
};
