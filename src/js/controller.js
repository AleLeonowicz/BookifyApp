import * as model from './model.js';
import * as helpers from './helpers.js';
import * as view from './views/view.js';
import * as loginModalView from './views/loginModalView.js';
import * as bookListsView from './views/bookListsView.js';
import * as searchResultsView from './views/searchResultsView';
import * as constants from './constants.js';
import * as firebaseUtils from './firebase.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
//

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

constants.form.addEventListener('submit', async function (e) {
  try {
    e.preventDefault();
    const userInput = helpers.getQuery();
    if (!userInput) return;

    view.clearContainer(constants.resultDetailsContainer);
    view.clearContainer(constants.resultListContainer);
    view.renderSpinner();

    const data = await helpers.getJSON(
      `https://www.googleapis.com/books/v1/volumes?q=${userInput}&langRestrict=en&maxResults=40`
    );

    if (!data) return;

    const filteredData = helpers.getFilteredData(data.items);
    // console.log('filteredData', filteredData);
    model.setState(filteredData, 'data');

    view.clearContainer(constants.resultDetailsContainer);
    // console.log('model.state.data', model.state.data);
    model.state.data.forEach(item => {
      searchResultsView.insertResult(item);
    });

    if ('URLSearchParams' in window) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('query', userInput);
      searchParams.delete('bookID');
      const newRelativePathQuery =
        window.location.pathname + '?' + searchParams;
      history.pushState(null, '', newRelativePathQuery);
    }
  } catch (err) {
    console.error(err);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

constants.resultListContainer.addEventListener('click', async function (e) {
  try {
    const searchResult = e.target.closest('.search-result');
    if (!searchResult) return;
    view.clearContainer(constants.resultDetailsContainer);
    view.renderSpinner();

    const link = searchResult.getAttribute('data-selfLink');

    const selectedResult = await helpers.getJSON(link);

    model.setState(selectedResult, 'selectedResult');

    view.clearContainer(constants.resultDetailsContainer);

    searchResultsView.reRenderResultContainer(
      constants.resultDetailsContainer,
      model.state.selectedResult,
      model.state
    );

    view.scrollIntoView('#nav');

    /////

    const bookID = link.split(
      'https://www.googleapis.com/books/v1/volumes/'
    )[1];

    if ('URLSearchParams' in window) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('bookID', bookID);
      const newRelativePathQuery =
        window.location.pathname + '?' + searchParams;
      history.pushState(null, '', newRelativePathQuery);
    }
  } catch (err) {
    console.error(err);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

document
  .querySelector('.result-details__container')
  .addEventListener('click', async function (e) {
    try {
      const btn = e.target.closest('.favourites__icon');
      // console.log('e.target', e.target);
      if (!btn) return;
      if (!model.state.isLoggedIn) return;

      await model.addToState('favourites', 'favouritesList');

      firebaseUtils.addToDb('favourites', model.state.userId, [
        ...model.state.favourites,
      ]);

      searchResultsView.reRenderResultContainer(
        constants.resultDetailsContainer,
        model.state.selectedResult,
        model.state
      );
      view.clearContainer(constants.favouritesList);
      model.state.favouritesList.forEach(book => {
        bookListsView.insertBookList(book, constants.favouritesList);
      });
    } catch (err) {
      console.error(err);
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////

document
  .querySelector('.result-details__container')
  .addEventListener('click', async function (e) {
    try {
      const btn = e.target.closest('.to-read__icon');
      if (!btn) return;
      if (!model.state.isLoggedIn) return;

      await model.addToState('toRead', 'toReadList');

      firebaseUtils.addToDb('toRead', model.state.userId, [
        ...model.state.toRead,
      ]);

      searchResultsView.reRenderResultContainer(
        constants.resultDetailsContainer,
        model.state.selectedResult,
        model.state
      );

      view.clearContainer(constants.toReadList);
      model.state.toReadList.forEach(book => {
        bookListsView.insertBookList(book, constants.toReadList);
      });
    } catch (err) {
      console.error(err);
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////

firebaseUtils.firebaseApp.auth().onAuthStateChanged(async function (user) {
  try {
    if (user) {
      // User is signed in.
      // console.log('logged in````', user);
      model.reconcileUserState(true, user._delegate.uid);
      model.cleanState();

      view.displayUsersEmail(user._delegate.email);
      helpers.setDisplayFlex([constants.usersEmail, constants.logOutBtn]);
      helpers.setDisplayNone([constants.signUpBtn, constants.modal]);

      await model.getStateFromDb('favourites');
      await model.getStateFromDb('toRead');

      await helpers.fetchBookListData('toRead', 'toReadList');
      await helpers.fetchBookListData('favourites', 'favouritesList');

      model.state.toReadList.forEach(book =>
        bookListsView.insertBookList(book, constants.toReadList)
      );

      model.state.favouritesList.forEach(book =>
        bookListsView.insertBookList(book, constants.favouritesList)
      );

      /////
      constants.toReadBtn.removeEventListener(
        'click',
        loginModalView.openModal
      );
      constants.favouritesBtn.removeEventListener(
        'click',
        loginModalView.openModal
      );

      constants.toReadBtn.addEventListener('click', () =>
        helpers.toggleStyles(
          'toReadContainer',
          'toReadList',
          'toReadPlaceholder'
        )
      );

      constants.favouritesBtn.addEventListener('click', () =>
        helpers.toggleStyles(
          'favouritesContainer',
          'favouritesList',
          'favouritesPlaceholder'
        )
      );

      if (model.state.selectedResult)
        searchResultsView.reRenderResultContainer(
          constants.resultDetailsContainer,
          model.state.selectedResult,
          model.state
        );
    } else {
      // User is not signed in.
      // console.log('logged out````');
      model.reconcileUserState(false, '');
      model.cleanState();

      helpers.setDisplayNone([constants.usersEmail, constants.logOutBtn]);
      helpers.setDisplayFlex([constants.signUpBtn]);

      firebaseUtils.initAuth();

      constants.toReadBtn.removeEventListener('click', () =>
        helpers.toggleStyles(
          'toReadContainer',
          'toReadList',
          'toReadPlaceholder'
        )
      );

      constants.favouritesBtn.removeEventListener('click', () =>
        helpers.toggleStyles(
          'favouritesContainer',
          'favouritesList',
          'favouritesPlaceholder'
        )
      );

      constants.toReadBtn.addEventListener('click', loginModalView.openModal);
      constants.favouritesBtn.addEventListener(
        'click',
        loginModalView.openModal
      );

      view.clearContainer(constants.toReadList);
      view.clearContainer(constants.favouritesList);

      if (model.state.selectedResult)
        searchResultsView.reRenderResultContainer(
          constants.resultDetailsContainer,
          model.state.selectedResult,
          model.state
        );
    }
  } catch (err) {
    console.error(err);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

firebaseUtils.initAuth();

constants.modalOpenBtn.addEventListener('click', loginModalView.openModal);
constants.modalCloseBtn.addEventListener('click', loginModalView.closeModalBtn);
window.addEventListener('click', loginModalView.closeModal);
constants.logOutBtn.addEventListener('click', firebaseUtils.logOut);

window.addEventListener('click', e =>
  bookListsView.closebookList(e, constants.toReadContainer, constants.toReadBtn)
);

window.addEventListener('click', e =>
  bookListsView.closebookList(
    e,
    constants.favouritesContainer,
    constants.favouritesBtn
  )
);

/////////////////////////////////////////////////////////////////////////////////////////

constants.favouritesList.addEventListener('click', async function (e) {
  try {
    const book = e.target.closest('.booksList__preview');
    if (!book) return;

    const link = book.getAttribute('data-selfLink');
    const selectedResult = await helpers.getJSON(link);

    model.setState(selectedResult, 'selectedResult');

    searchResultsView.reRenderResultContainer(
      constants.resultDetailsContainer,
      model.state.selectedResult,
      model.state
    );
  } catch (err) {
    console.error(err);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

constants.toReadList.addEventListener('click', async function (e) {
  try {
    const book = e.target.closest('.booksList__preview');
    if (!book) return;

    const link = book.getAttribute('data-selfLink');
    const selectedResult = await helpers.getJSON(link);

    model.setState(selectedResult, 'selectedResult');

    searchResultsView.reRenderResultContainer(
      constants.resultDetailsContainer,
      model.state.selectedResult,
      model.state
    );
  } catch (err) {
    console.error(err);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', async function () {
  try {
    const searchParams = new URLSearchParams(window.location.search);

    if (window.location.search === '') {
      searchResultsView.insertPlaceholder();
    }

    if (window.location.search !== '') {
      view.renderSpinner();
    }

    const query = searchParams.get('query');
    // console.log(query);
    if (!query) return;

    const data = await helpers.getJSON(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&maxResults=40`
    );

    const filteredData = helpers.getFilteredData(data.items);
    // console.log('filteredData', filteredData);
    model.setState(filteredData, 'data');

    view.clearContainer(constants.resultDetailsContainer);
    // console.log('model.state.data', model.state.data);
    model.state.data.forEach(item => {
      searchResultsView.insertResult(item);
    });

    const bookID = searchParams.get('bookID');
    if (!bookID) return;

    const link = `https://www.googleapis.com/books/v1/volumes/${bookID}`;

    const selectedResult = await helpers.getJSON(link);

    model.setState(selectedResult, 'selectedResult');

    searchResultsView.reRenderResultContainer(
      constants.resultDetailsContainer,
      model.state.selectedResult,
      model.state
    );
  } catch (err) {
    console.error(err);
  }
});
