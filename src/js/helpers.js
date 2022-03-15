import * as model from './model.js';
import * as constants from './constants.js';
import * as view from './views/view.js';

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export const getQuery = function () {
  const query = constants.searchField.value.replaceAll(' ', '+');
  constants.searchField.value = '';
  // console.log(query);
  return query;
};

/////////////////////////////////////////////////////////////////////////////////////////

export const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.totalItems === 0) {
      view.clearContainer(constants.resultDetailsContainer);
      view.renderErrorMsg();
      return;
    }
    return data;
  } catch (err) {
    throw err;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

export const getFilteredData = function (data) {
  return data.filter(
    item =>
      item.volumeInfo &&
      item.volumeInfo.imageLinks &&
      item.volumeInfo.imageLinks.thumbnail &&
      item.volumeInfo.title &&
      item.volumeInfo.authors &&
      item.volumeInfo.categories &&
      item.volumeInfo.description &&
      item.volumeInfo.pageCount &&
      item.volumeInfo.publishedDate
  );
};

/////////////////////////////////////////////////////////////////////////////////////////

export const setDisplayNone = function (arr) {
  arr.forEach(element => (element.style.display = 'none'));
};

/////////////////////////////////////////////////////////////////////////////////////////

export const setDisplayFlex = function (arr) {
  arr.forEach(element => (element.style.display = 'flex'));
};

/////////////////////////////////////////////////////////////////////////////////////////

export const fetchBookListData = async function (fromList, toList) {
  try {
    const data = await model.state[fromList].map(link => getJSON(link));
    const result = await Promise.all(data);

    model.setState(result, toList);
  } catch (err) {
    throw err;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

export const toggleStyles = function (container, list, placeholder) {
  window.getComputedStyle(constants[container]).opacity === '0'
    ? (constants[container].style.opacity = '1')
    : (constants[container].style.opacity = '0');

  window.getComputedStyle(constants[container])['z-index'] === '-1'
    ? (constants[container].style['z-index'] = '10')
    : (constants[container].style['z-index'] = '-1');

  if (model.state[list].length === 0) {
    constants[placeholder].style.display = 'flex';
  } else {
    constants[placeholder].style.display = 'none';
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

/*
//TODO: togglePlaceholder
export const hidePlaceholder = function () {
  if (window.location.search !== '') {
    constants.mainPlaceholder.style.display = 'none';
  } else {
    constants.mainPlaceholder.style.display = 'flex';
  }
};

*/
