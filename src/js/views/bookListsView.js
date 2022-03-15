import * as constants from '../constants.js';

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export const insertBookList = function (book, container) {
  const mockup = `
    <li class="booksList__preview" data-selfLink="${book.selfLink}">
      <a class="booksList__preview__link">
        <figure class="booksList__preview__fig">
          <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.authors}">
        </figure>
        <div class="booksList__preview__data">
          <h4 class="booksList__preview__title">${book.volumeInfo.title}</h4>
          <p class="booksList__preview__author">${book.volumeInfo.authors}</p>
        </div>
      </a>
    </li>`;

  container.insertAdjacentHTML('beforeEnd', mockup);
};

/////////////////////////////////////////////////////////////////////////////////////////

export const closebookList = function (e, container, btn) {
  if (e.target !== container && e.target !== btn) {
    container.style.opacity = '0';
    container.style['z-index'] = '-1';
  }
};
