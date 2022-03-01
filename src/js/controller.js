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

constants.form.addEventListener('submit', async function (e) {
  e.preventDefault();
  view.clearResultsContainer();
  const userInput = helpers.getQuery();
  const data = await helpers.getJSON(
    `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&maxResults=40`
  );

  const filteredData = helpers.getFilteredData(data.items);
  console.log('filteredData', filteredData);
  model.setState(filteredData, 'data');

  console.log('model.state.data', model.state.data);
  model.state.data.forEach(item => {
    view.insertResult(item);
  });
});

constants.resultsContainer.addEventListener('click', function (e) {
  console.log(e.target);
  const searchResult = e.target.closest('.search-result');
  console.log(searchResult);
  if (!searchResult) return;

  view.insertResultsDetails();
});
