import {getTimeFromMins, getDayFormatDate, createElement} from '../utils.js';

const createGenres = (genres) => {
  const fragment = [];
  for (let i = 0; i < genres.length; i++) {
    fragment[i] = `<span class="film-details__genre">${ genres[i] }</span>`;
  }
  return fragment.join('');
};

const createFilmDetailsTemplate = ({filmInfo, userDetails}) => {
  const {title, alternativeTitle, totalRating, poster, release, runtime, genre, description, ageRating, director, writers, actors} = filmInfo;
  const {watchList, alreadyWatched, favorite} = userDetails;

  return `<div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src=${ poster } alt="">

        <p class="film-details__age">${ ageRating }+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${ title }</h3>
            <p class="film-details__title-original">Original: ${ alternativeTitle }</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${ totalRating }</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${ director }</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${ writers.join(', ') }</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${ actors.join(', ') }</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${ getDayFormatDate(release.date) }</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${ getTimeFromMins(runtime) }</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${ release.releaseCountry }</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${ genre.length === 1 ? 'Genre' : 'Genres' }</td>
            <td class="film-details__cell">
              ${ createGenres(genre) }
          </tr>
        </table>

        <p class="film-details__film-description">
        ${ description }
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist${ watchList ? ' film-details__control-button--active' : '' }" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched${ alreadyWatched ? ' film-details__control-button--active' : '' }" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite${ favorite ? ' film-details__control-button--active' : '' }" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>`;
};

export default class PopupFilmDetailsView {
  #element = null;
  #cards = null;

  constructor (cards) {
    this.#cards = cards;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmDetailsTemplate(this.#cards);
  }

  removeElement() {
    this.#element = null;
  }
}