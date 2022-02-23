import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

//////////////////////////////////////////////
//////////////////////////////////////////////
/*
1. Catch user's input
2. Save it in state
3. If 'GO' is clicked - fetch
*/

const searchField = document.querySelector('.search__field');
const submitBtn = document.querySelector('.nav__btn-search');
const form = document.querySelector('.nav__search');
const resultsContainer = document.querySelector('.results-container__box');

let state = {};

const getQuery = function () {
  const query = searchField.value;
  searchField.value = '';
  return query;
};

const getJSON = async function (url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const insertResult = function (result) {
  const mockup = `
  <div class="search-result">
    <img
    class="search-result__img"
    src="${result.volumeInfo.imageLinks.thumbnail}"
    />
    <div class="search-result__overlay">
      <div class="search-result__text">
      "${result.volumeInfo.title}" by ${result.volumeInfo.authors}
      </div>
    </div>
  </div>`;

  resultsContainer.insertAdjacentHTML('beforeEnd', mockup);
};

const clearResultsContainer = function () {
  state.data = [];
  resultsContainer.innerHTML = '';
};

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearResultsContainer();
  const userInput = getQuery().replaceAll(' ', '+');
  const data = await getJSON(
    `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&maxResults=40`
  );

  console.log('data.items', data.items);

  const filteredData = data.items.filter(
    item =>
      item.volumeInfo &&
      item.volumeInfo.imageLinks &&
      item.volumeInfo.imageLinks.thumbnail &&
      item.volumeInfo.title &&
      item.volumeInfo.authors
  );

  console.log('filteredData', filteredData);
  state.data = filteredData;
  console.log('state.data', state.data);

  state.data.forEach(item => {
    insertResult(item);
  });
});
