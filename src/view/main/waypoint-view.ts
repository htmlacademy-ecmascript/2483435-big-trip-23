/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../framework/view/view';
import dayjs from 'dayjs';
import type { Waypoint } from '../../types/waypoint-type';
import type { Destination } from '../../types/destination-type';
import type { InnerOffer } from '../../types/offer-type';
import { capitalLetter } from '../../utils/utils';
import { getDuration } from '../../utils/time';

function getTemplate(waypoint: Waypoint, destination: Destination, selectedOffers: InnerOffer[]): string {
  const { dateFrom, dateTo, type, basePrice, isFavorite } = waypoint;
  const { name } = destination;

  const date = dayjs(dateFrom).format('MMM DD');
  const timeStart = dateFrom.format('HH:mm');
  const timeEnd = dateTo.format('HH:mm');
  const correctType = capitalLetter(type);
  const currentName = 'name' in destination ? name : '';

  const getDurationTrip = () => getDuration(dateFrom, dateTo);

  const createSelectedOffersTemplate = (offer: InnerOffer): string => `
  <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
  `;

  const isFavoriteEvent = isFavorite ? 'event__favorite-btn--active' : '';

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
      <p class="event__duration">${getDurationTrip()}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">

    ${selectedOffers.map((offer: InnerOffer): string => createSelectedOffersTemplate(offer)).join('')}

    </ul>
    <button class="event__favorite-btn ${isFavoriteEvent}" type="button">
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

export default class WaypointView extends View<HTMLTimeElement> {
  #waypoint: Waypoint;
  #destination: Destination;
  #selectedOffers: InnerOffer[];
  #handleEditClick: any;

  constructor({ waypointData, onEditClick }: { waypointData: any; onEditClick: any }) {
    super();

    this.#waypoint = waypointData.waypoint;
    this.#destination = waypointData.dataBase.destinationsModel.getDestination(this.#waypoint);
    this.#selectedOffers = waypointData.dataBase.offersModel.getSelectedOffers(this.#waypoint);

    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return getTemplate(this.#waypoint, this.#destination, this.#selectedOffers);
  }

  #editClickHandler = (evt: any) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
