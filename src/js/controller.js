import * as model from './model.js';
import * as helpers from './helpers.js';
import * as view from './views/view.js';
import * as loginModalView from './views/loginModalView.js';
import * as constants from './constants.js';
import * as firebaseUtils from './firebase.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
//

//////////////////////////////////////////////
//////////////////////////////////////////////

constants.form.addEventListener('submit', async function (e) {
  e.preventDefault();
  view.clearContainer(constants.resultDetailsContainer);
  view.clearContainer(constants.resultListContainer);
  const userInput = helpers.getQuery();
  const data = await helpers.getJSON(
    `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&maxResults=40`
  );

  const filteredData = helpers.getFilteredData(data.items);
  console.log('filteredData', filteredData);
  model.setState(filteredData, 'data');

  // console.log('model.state.data', model.state.data);
  model.state.data.forEach(item => {
    view.insertResult(item);
  });
});

constants.resultListContainer.addEventListener('click', async function (e) {
  // console.log(e.target);
  const searchResult = e.target.closest('.search-result');
  // console.log(searchResult);
  if (!searchResult) return;

  const link = searchResult.getAttribute('data-selfLink');
  // console.log(link);

  const selectedResult = await helpers.getJSON(link);
  // console.log(selectedResult);

  model.setState(selectedResult, 'selectedResult');
  // console.log('model.state.selectedResult', model.state.selectedResult);

  // console.log(
  //   'constants.resultDetailsContainer',
  //   constants.resultDetailsContainer
  // );
  view.clearContainer(constants.resultDetailsContainer);
  view.insertResultsDetails(model.state.selectedResult);
  view.scrollIntoView('#result-details');
});

firebaseUtils.firebaseApp.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('logged in````', user);
    constants.usersEmail.style.display = 'flex';
    constants.logOutBtn.style.display = 'flex';
    constants.signUpBtn.style.display = 'none';
    constants.modal.style.display = 'none';
  } else {
    // User is not signed in.
    console.log('logged out````');
    constants.usersEmail.style.display = 'none';
    constants.logOutBtn.style.display = 'none';
    constants.signUpBtn.style.display = 'flex';
    firebaseUtils.initAuth();
  }
});

firebaseUtils.initAuth();

constants.modalOpenBtn.addEventListener('click', loginModalView.openModal);
constants.modalCloseBtn.addEventListener('click', loginModalView.closeModalBtn);
window.addEventListener('click', loginModalView.closeModal);

constants.logOutBtn.addEventListener('click', firebaseUtils.logOut);
