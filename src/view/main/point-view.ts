import AbstractView from '../../framework/view/view';
import dayjs from 'dayjs';
import type { Point } from '../../types/point-type';
import type { Destination } from '../../types/destination-type';
import type { InnerOffer } from '../../types/offer-type';
import { capitalLetter } from '../../utils/utils';
import { getDuration } from '../../utils/time/time';
import { createSelectedOffersTemplate } from '../../templates/selected-offers-template';
import type { EmptyFn, PointData } from '../../types/common';

function getTemplate(point: Point, destination: Destination, selectedOffers: InnerOffer[]): string {
  const { dateFrom, dateTo, type, basePrice, isFavorite } = point;
  const { name } = destination;
  const date = dayjs(dateFrom).format('MMM DD');
  const timeStart = dayjs(dateFrom).format('HH:mm');
  const timeEnd = dayjs(dateTo).format('HH:mm');
  const correctType = capitalLetter(type);
  const currentName = 'name' in destination ? name : '';

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dateFrom}">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${correctType} ${currentName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${timeStart}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${timeEnd}</time>
      </p>
      <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">

    ${createSelectedOffersTemplate(selectedOffers)}

    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`;
}

export default class PointView extends AbstractView<HTMLTimeElement> {
  #point: Point;
  #destination: Destination;
  #selectedOffers: InnerOffer[];
  #handleEditClick: EmptyFn;
  #handleFavoriteClick: EmptyFn;

  constructor({ point, dataBase, onEditClick, onFavoriteClick }: PointData & { onEditClick: EmptyFn; onFavoriteClick: EmptyFn }) {
    super();

    this.#point = point;
    this.#destination = dataBase.destinationsModel.getDestinationByID(this.#point.destination)!;
    this.#selectedOffers = dataBase.offersModel.getSelectedOffers(this.#point);

    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')!.addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return getTemplate(this.#point, this.#destination, this.#selectedOffers);
  }

  #editClickHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
