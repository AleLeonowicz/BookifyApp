import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

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

const getQuery = function () {
  const query = searchField.value;
  searchField.value = '';
  return query;
};

const getJSON = async function (url) {
  const response = await fetch(url);
  console.log('response', response);
  const data = await response.json();
  return data;
};

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const userInput = getQuery().replaceAll(' ', '+');
  console.log(userInput);
  const data = await getJSON(
    `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&maxResults=40`
  );
  console.log('json data', data);
});
