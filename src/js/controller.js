import * as model from './model.js';
import * as helpers from './helpers.js';
import * as view from './views/view.js';
import * as loginModalView from './views/loginModalView.js';
import * as constants from './constants.js';
import * as firebaseUtils from './firebase.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/////

// if (module.hot) {
//   module.hot.accept();
//

//////////////////////////////////////////////
//////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

constants.form.addEventListener('submit', async function (e) {
  e.preventDefault();
  view.clearContainer(constants.resultDetailsContainer);
  view.clearContainer(constants.resultListContainer);
  const userInput = helpers.getQuery();
  const data = await helpers.getJSON(
    `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&maxResults=40`
  );

  const filteredData = helpers.getFilteredData(data.items);
  // console.log('filteredData', filteredData);
  model.setState(filteredData, 'data');

  // console.log('model.state.data', model.state.data);
  model.state.data.forEach(item => {
    view.insertResult(item);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////

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
  // console.log('model.state', model.state);

  // view.clearContainer(constants.resultDetailsContainer);
  // view.insertResultsDetails(model.state.selectedResult, model.state.favourites);
  view.reRenderResultContainer(
    constants.resultDetailsContainer,
    model.state.selectedResult,
    model.state
  );

  view.scrollIntoView('#nav');
});

/////////////////////////////////////////////////////////////////////////////////////////

document
  .querySelector('.result-details__container')
  .addEventListener('click', async function (e) {
    const btn = e.target.closest('.favourites__icon');
    // console.log('e.target', e.target);
    if (!btn) return;
    if (!model.state.isLoggedIn) return;

    model.addToState('favourites');

    firebaseUtils.addToDb('favourites', model.state.userId, [
      ...model.state.favourites,
    ]);

    view.reRenderResultContainer(
      constants.resultDetailsContainer,
      model.state.selectedResult,
      model.state
    );
  });

/////////////////////////////////////////////////////////////////////////////////////////

document
  .querySelector('.result-details__container')
  .addEventListener('click', async function (e) {
    const btn = e.target.closest('.to-read__icon');
    // console.log('e.target', e.target);
    if (!btn) return;
    if (!model.state.isLoggedIn) return;

    model.addToState('toRead');

    firebaseUtils.addToDb('toRead', model.state.userId, [
      ...model.state.toRead,
    ]);

    view.reRenderResultContainer(
      constants.resultDetailsContainer,
      model.state.selectedResult,
      model.state
    );
  });

/////////////////////////////////////////////////////////////////////////////////////////

firebaseUtils.firebaseApp.auth().onAuthStateChanged(async function (user) {
  if (user) {
    // User is signed in.
    console.log('logged in````', user);
    model.setState(true, 'isLoggedIn');
    model.setState(user._delegate.uid, 'userId');

    if (model.state.selectedResult)
      view.reRenderResultContainer(
        constants.resultDetailsContainer,
        model.state.selectedResult,
        model.state
      );

    helpers.setDisplayFlex([constants.usersEmail, constants.logOutBtn]);
    helpers.setDisplayNone([constants.signUpBtn, constants.modal]);

    await model.getStateFromDb('favourites');
    await model.getStateFromDb('toRead');

    const fetchBookListData = async function () {
      const data = await model.state.toRead.map(link => helpers.getJSON(link));
      const result = await Promise.all(data);
      console.log('result', result);

      model.setState(result, 'toReadList');
    };
    await fetchBookListData();

    model.state.toRead.forEach(book => view.insertBookList());

    constants.toReadBtn.removeEventListener('click', loginModalView.openModal);
    constants.favouritesBtn.removeEventListener(
      'click',
      loginModalView.openModal
    );

    constants.toReadBtn.addEventListener('click', function () {
      window.getComputedStyle(constants.toReadContainer).opacity === '0'
        ? (constants.toReadContainer.style.opacity = '1')
        : (constants.toReadContainer.style.opacity = '0');

      window.getComputedStyle(constants.toReadContainer)['z-index'] === '-1'
        ? (constants.toReadContainer.style['z-index'] = '10')
        : (constants.toReadContainer.style['z-index'] = '-1');
    });
  } else {
    // User is not signed in.
    console.log('logged out````');
    model.setState(false, 'isLoggedIn');
    model.setState('', 'userId');
    model.setState([], 'favourites');
    model.setState([], 'toRead');

    helpers.setDisplayNone([constants.usersEmail, constants.logOutBtn]);
    helpers.setDisplayFlex([constants.signUpBtn]);

    firebaseUtils.initAuth();
    if (model.state.selectedResult)
      view.reRenderResultContainer(
        constants.resultDetailsContainer,
        model.state.selectedResult,
        model.state
      );
    constants.toReadBtn.addEventListener('click', loginModalView.openModal);
    constants.favouritesBtn.addEventListener('click', loginModalView.openModal);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

firebaseUtils.initAuth();

constants.modalOpenBtn.addEventListener('click', loginModalView.openModal);
constants.modalCloseBtn.addEventListener('click', loginModalView.closeModalBtn);
window.addEventListener('click', loginModalView.closeModal);
constants.logOutBtn.addEventListener('click', firebaseUtils.logOut);

/////////////////////////////////////////////////////////////////////////////////////////
