import * as constants from '../constants.js';
import heart1 from 'url:../../img/heart1.png';
import heart2 from 'url:../../img/heart2.png';
import star1 from 'url:../../img/star1.png';
import glasses1 from 'url:../../img/eyeglasses1.png';
import glasses2 from 'url:../../img/eyeglasses2.png';
import spinner from 'url:../../img/spinner.svg';

export const scrollIntoView = function (id) {
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
};

export const insertResult = function (result) {
  const mockup = `
    <div class="search-result" data-selfLink="${result.selfLink}">
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

  constants.resultListContainer.insertAdjacentHTML('beforeEnd', mockup);
};

export const clearContainer = function (container) {
  container.innerHTML = '';
};

export const insertResultsDetails = function (selectedResult, state) {
  // console.log('selectedResult', selectedResult);
  // console.log('favourites', favourites);
  const heartIcon = state.favourites.includes(selectedResult.selfLink)
    ? heart2
    : heart1;

  const glassesIcon = state.toRead.includes(selectedResult.selfLink)
    ? glasses2
    : glasses1;

  const mockup = `
  
            <img
            class="result-details__img"
            src="${selectedResult.volumeInfo.imageLinks.thumbnail}"
          />
          <div class="result-details__description">
            <div class="description__container">
              <div class="title__container">
                <div class="title__container__text">
                  Title: “${selectedResult.volumeInfo.title}”<br />Author: ${
    selectedResult.volumeInfo.authors
  }
                </div>
                ${
                  state.isLoggedIn
                    ? `<div class="title__container__icons">
                <img
                  class="to-read__icon"
                  alt="To read list"
                  src="${glassesIcon}"
                />
                <img
                  class="favourites__icon"
                  id="heart__icon"
                  alt="Favourites"
                  src="${heartIcon}"
                />
              </div>`
                    : ''
                }
                
              </div>
              <div class="ratings__container">
                <img
                  class="raitings__star-img"
                  alt="star"
                  src="${star1}"
                />
                <div class="raitings__raiting">${
                  selectedResult.volumeInfo.averageRating
                    ? selectedResult.volumeInfo.averageRating
                    : '-'
                }</div>
                <div class="raitings__number">${
                  selectedResult.volumeInfo.ratingsCount
                    ? selectedResult.volumeInfo.ratingsCount
                    : 0
                }<br />raitings</div>
              </div>
              <div class="additional-info">
                Genre: ${
                  selectedResult.volumeInfo.categories
                    ? selectedResult.volumeInfo.categories[0]
                    : '-'
                }<br />Publication date: ${
    selectedResult.volumeInfo.publishedDate
  }<br />Pages:
                ${selectedResult.volumeInfo.pageCount}
              </div>
              <div class="summary-title">Summary:</div>
              <div class="summary">
              ${selectedResult.volumeInfo.description}
              </div>
              <div class="bottom-row__container">
                <div class="ratings__container-2">
                  <img
                    class="raitings__star-img"
                    alt="star"
                    src="${star1}"
                  />
                  <div class="raitings__raiting">${
                    selectedResult.volumeInfo.averageRating
                      ? selectedResult.volumeInfo.averageRating
                      : '-'
                  }</div>
                  <div class="raitings__number">${
                    selectedResult.volumeInfo.ratingsCount
                      ? selectedResult.volumeInfo.ratingsCount
                      : 0
                  }<br />raitings</div>
                </div>
                ${
                  state.isLoggedIn
                    ? `<div class="container__icons-2">
                    <img
                      class="to-read__icon"
                      alt="To read list"
                      src="${glassesIcon}"
                    />
                    <img
                      class="favourites__icon"
                      id="heart__icon"
                      alt="To read list"
                      src="${heartIcon}"
                    />
                  </div>`
                    : ''
                }
                

              </div>
            </div>
          </div>
          <div class="summary-container-2">
            <div class="summary-title-2">Summary:</div>
            <div class="summary-2">
            ${selectedResult.volumeInfo.description}
            `;

  constants.resultDetailsContainer.insertAdjacentHTML('afterBegin', mockup);
};

export const reRenderResultContainer = function (
  container,
  selectedResult,
  state
) {
  clearContainer(container);
  insertResultsDetails(selectedResult, state);
};

export const displayUsersEmail = function (email) {
  document.getElementById('usersEmail').innerHTML = `Hello, ${email} !`;
};

export const renderSpinner = function () {
  const mockup = `
  <div class="spinner">
     <img class="results-container__spinner" src="${spinner}" />
  </div>`;

  console.log('render spinner');

  constants.resultDetailsContainer.insertAdjacentHTML('afterbegin', mockup);
};
