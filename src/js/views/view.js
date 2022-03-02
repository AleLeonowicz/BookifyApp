import * as constants from '../constants.js';

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

export const insertResultsDetails = function (selectedResult) {
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
                <div class="title__container__icons">
                  <img
                    class="to-read__icon"
                    alt="To read list"
                    src="src/img/eyeglasses_2.png"
                  />
                  <img
                    class="favourites__icon"
                    alt="Favourites"
                    src="src/img/heart_3.png"
                  />
                </div>
              </div>
              <div class="ratings__container">
                <img
                  class="raitings__star-img"
                  alt="star"
                  src="src/img/star_3.png"
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
                  selectedResult.volumeInfo.categories[0]
                    ? selectedResult.volumeInfo.categories[0]
                    : selectedResult.volumeInfo.categories
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
                    src="src/img/star_3.png"
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
                <div class="container__icons-2">
                  <img
                    class="to-read__icon"
                    alt="To read list"
                    src="src/img/eyeglasses_2.png"
                  />
                  <img
                    class="favourites__icon"
                    alt="To read list"
                    src="src/img/heart_3.png"
                  />
                </div>
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
