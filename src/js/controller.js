import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

//////////////////////////////////////////////
//////////////////////////////////////////////
const searchField = document.querySelector('.search__field');
const submitBtn = document.querySelector('.nav__btn-search');
const form = document.querySelector('.nav__search');
const resultsContainer = document.querySelector('.results-container__box');

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
  model.state.data = [];
  resultsContainer.innerHTML = '';
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

const setState = function (newState, key) {
  model.state[key] = newState;
};

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearResultsContainer();
  const userInput = getQuery().replaceAll(' ', '+');
  const data = await getJSON(
    `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&maxResults=40`
  );

  const filteredData = getFilteredData(data.items);
  console.log('filteredData', filteredData);
  setState(filteredData, 'data');

  // model.state.data = filteredData;
  // console.log('state.data', model.state.data);
  console.log('model.state.data', model.state.data);
  model.state.data.forEach(item => {
    insertResult(item);
  });
});

// zrob nowa unkcje getFiltered data ktora otrzymujje data jako arg i oddaje przefiltrowany array. uzyj
// zrob nowa funkcje setState  kotra przymuje jako arg wartosc nowego stanu oraz drugi argument key, ktory mowi pod jakim kluczem zapisac te wartosc. funkcja nic nie zwaraca - undefined.
