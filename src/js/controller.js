import * as model from './model.js';
import * as helpers from './helpers.js';
import * as view from './views/view.js';
import * as constants from './constants.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
//

//////////////////////////////////////////////
//////////////////////////////////////////////

const clearResultsContainer = function () {
  model.state.data = [];
  constants.resultsContainer.innerHTML = '';
};

const getFilteredData = function (data) {
  return data.filter(
    item =>
      item.volumeInfo &&
      item.volumeInfo.imageLinks &&
      item.volumeInfo.imageLinks.thumbnail &&
      item.volumeInfo.title &&
      item.volumeInfo.authors
  );
};

constants.form.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearResultsContainer();
  const userInput = helpers.getQuery();
  const data = await helpers.getJSON(
    `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&maxResults=40`
  );

  const filteredData = getFilteredData(data.items);
  console.log('filteredData', filteredData);
  model.setState(filteredData, 'data');

  console.log('model.state.data', model.state.data);
  model.state.data.forEach(item => {
    view.insertResult(item);
  });
});
