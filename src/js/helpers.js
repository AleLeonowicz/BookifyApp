import * as constants from './constants.js';

export const getQuery = function () {
  const query = constants.searchField.value.replaceAll(' ', '+');
  constants.searchField.value = '';
  return query;
};

export const getJSON = async function (url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getFilteredData = function (data) {
  return data.filter(
    item =>
      item.volumeInfo &&
      item.volumeInfo.imageLinks &&
      item.volumeInfo.imageLinks.thumbnail &&
      item.volumeInfo.title &&
      item.volumeInfo.authors &&
      item.volumeInfo.categories
  );
};
