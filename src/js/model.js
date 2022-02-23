import { API_URL, RES_PER_PAGE } from './config.js';

export let state = { data: [] };

export const setState = function (newState, key) {
  state[key] = newState;
};
