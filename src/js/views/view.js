import * as constants from '../constants.js';

export const insertResult = function (result) {
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

  constants.resultsContainer.insertAdjacentHTML('beforeEnd', mockup);
};
