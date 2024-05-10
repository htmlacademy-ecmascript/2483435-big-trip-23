/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../framework/view/view';
import dayjs from 'dayjs';
import type { Waypoint } from '../../types/waypoint-type';
import type { Destination } from '../../types/destination-type';
import type { InnerOffer } from '../../types/offer-type';
import { POINTS_TYPES } from '../../const';
import { capitalLetter, checkMatch } from '../../utils/utils';

function getTemplate(
  waypoint: Waypoint,
  destination: Destination,
  allDestinationsNames: string[],
  availableOffers: InnerOffer[],
  selectedOffers: InnerOffer[],
): string {
  const { type, dateFrom, dateTo, basePrice } = waypoint;
  const { name, description } = destination;

  const correctType = capitalLetter(type);
  const correctName = capitalLetter(name);
  const timeStart = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const timeEnd = dayjs(dateTo).format('DD/MM/YY HH:mm');

  const createWaypointsTypesTemplate = (waypointsType: string) => {
    const isChecked = () => checkMatch(type, waypointsType, 'checked');

    return `<div class="event__type-item">
    <input id="event-type-${waypointsType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${waypointsType}" ${isChecked()}>
    <label class="event__type-label  event__type-label--${waypointsType}" for="event-type-${waypointsType}-1">${correctType}</label>
  </div>`;
  };

  const createDestinationsTemplate = (currentName: string) => {
    const isChecked = () => checkMatch(name, currentName, 'checked');

    return `<option value="${name}"${isChecked()}></option>`;
  };

  const createAvailableOffersTemplate = (offer: InnerOffer): string => {
    const selectedOffersIDs = selectedOffers.map((selectOffer) => selectOffer.id);

    const isSelected = () => (selectedOffersIDs.includes(offer.id) ? 'checked' : '');

    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${isSelected()}>
    <label class="event__offer-label" for="event-offer-${offer.id}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </label>
      </div>`;
  };

  const createOffersTemplate = () =>
    availableOffers.length !== 0
      ? `
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${availableOffers.map((offer: InnerOffer): string => createAvailableOffersTemplate(offer)).join('')}
  </div>
  </section>`
      : '';

  const createDescriptionTemplate = () =>
    description.length !== 0
      ? `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    </section>`
      : '';

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${POINTS_TYPES.map((waypointsType: string): string => createWaypointsTypesTemplate(waypointsType)).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${correctType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${correctName}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${allDestinationsNames.map((currentName: string): string => createDestinationsTemplate(currentName)).join('')}
      </datalist>
    </div>

  <div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time-1">From</label>
  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart}">
  &mdash;
  <label class="visually-hidden" for="event-end-time-1">To</label>
  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd}">
  </div>

  <div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
    </button>
    </header>
    <section class="event__details">

    ${createOffersTemplate()}

    ${createDescriptionTemplate()}

    </section>
    </form>
    </li>
    `;
}

export default class EditWaypointFormView extends View<HTMLFormElement> {
  #waypoint: Waypoint;
  #destination: Destination;
  #allDestinationsNames: string[];
  #availableOffers: InnerOffer[];
  #selectedOffers: InnerOffer[];
  #handleFormSubmit: any;
  #handleFormCancel: any;

  constructor({ waypointData, onFormSubmit, onFormCancel }: { waypointData: any; onFormSubmit: any; onFormCancel: any }) {
    super();
    this.#waypoint = waypointData.waypoint;
    this.#destination = waypointData.dataBase.destinationsModel.getDestination(this.#waypoint);
    this.#allDestinationsNames = waypointData.dataBase.destinationsModel.allDestinationsNames;
    this.#availableOffers = waypointData.dataBase.offersModel.getAvailableOffers(this.#waypoint);
    this.#selectedOffers = waypointData.dataBase.offersModel.getSelectedOffers(this.#waypoint);

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormCancel = onFormCancel;
    this.element.querySelector('form')!.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')!.addEventListener('click', this.#onCancelForm);
    this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#onCancelForm);
  }

  get template() {
    return getTemplate(this.#waypoint, this.#destination, this.#allDestinationsNames, this.#availableOffers, this.#selectedOffers);
  }

  #formSubmitHandler = (evt: any) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #onCancelForm = (evt: any) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
