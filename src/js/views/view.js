import * as constants from '../constants.js';
import spinner from 'url:../../img/spinner.svg';

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export const scrollIntoView = function (id) {
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
};

/////////////////////////////////////////////////////////////////////////////////////////

export const clearContainer = function (container) {
  container.innerHTML = '';
};

/////////////////////////////////////////////////////////////////////////////////////////

export const displayUsersEmail = function (email) {
  document.getElementById('usersEmail').innerHTML = `Hello, ${email} !`;
};

/////////////////////////////////////////////////////////////////////////////////////////

export const renderSpinner = function () {
  const mockup = `
  <div class="spinner">
     <img class="result-details__spinner" src="${spinner}" />
  </div>`;

  constants.resultDetailsContainer.insertAdjacentHTML('afterbegin', mockup);
};

/////////////////////////////////////////////////////////////////////////////////////////

export const renderErrorMsg = function () {
  mockup = `<div class="result-details__error-msg">Sorry, no books found for your search. Try again!</div>`;
  constants.resultDetailsContainer.insertAdjacentHTML('afterbegin', mockup);
};
