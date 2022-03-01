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

export const clearResultsContainer = function () {
  constants.resultsContainer.innerHTML = '';
};

export const insertResultsDetails = function () {
  const mockup = `
  <div class="result-details__container">
          <img
            class="result-details__img"
            src="https://m.media-amazon.com/images/I/71ykU-RQ0nL._AC_SL1000_.jpg"
          />
          <div class="result-details__description">
            <div class="description__container">
              <div class="title__container">
                <div class="title__container__text">
                  Title: “Harry Potter and the Goblet of Fire”<br />Author: J.K.
                  Rowling
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
                <div class="raitings__raiting">4.8</div>
                <div class="raitings__number">152<br />raitings</div>
              </div>
              <div class="additional-info">
                Genre: fantasy<br />Publication date: 8 July 2000<br />Pages:
                636
              </div>
              <div class="summary-title">Summary:</div>
              <div class="summary">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur?
              </div>
              <div class="bottom-row__container">
                <div class="ratings__container-2">
                  <img
                    class="raitings__star-img"
                    alt="star"
                    src="src/img/star_3.png"
                  />
                  <div class="raitings__raiting">4.8</div>
                  <div class="raitings__number">152<br />raitings</div>
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
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur?
            </div>
          </div>`;

  constants.resultsContainer.insertAdjacentHTML('afterBegin', mockup);
};
