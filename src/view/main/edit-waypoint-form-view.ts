/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../framework/view/view';
import dayjs from 'dayjs';
import type { Waypoint } from '../../types/waypoint-type';
import type { Destination } from '../../types/destination-type';
import type { InnerOffer } from '../../types/offer-type';
import { capitalLetter } from '../../utils/utils';
import { createWaypointsTypesListTemplate } from '../../templates/new-edit-form/types-template';
import { createDestinationsListTemplate } from '../../templates/new-edit-form/destinations-template';
import { createOffersTemplate } from '../../templates/new-edit-form/offers-template';
import { createDescriptionTemplate } from '../../templates/new-edit-form/description-template';
import type { WaypointData } from '../../types/common';

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

          ${createWaypointsTypesListTemplate(type)}

        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${correctType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${correctName}" list="destination-list-1">
      <datalist id="destination-list-1">

      ${createDestinationsListTemplate(name, allDestinationsNames)}

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

    ${createOffersTemplate(availableOffers, selectedOffers)}

    ${createDescriptionTemplate(description)}

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

  constructor({ waypoint, dataBase, onFormSubmit, onFormCancel }: WaypointData & { onFormSubmit: any; onFormCancel: any }) {
    super();
    this.#waypoint = waypoint;
    this.#destination = dataBase.destinationsModel.getDestination(this.#waypoint)!;
    this.#allDestinationsNames = dataBase.destinationsModel.allDestinationsNames;
    this.#availableOffers = dataBase.offersModel.getAvailableOffers(this.#waypoint);
    this.#selectedOffers = dataBase.offersModel.getSelectedOffers(this.#waypoint);

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
    this.#handleFormSubmit(this.#waypoint);
  };

  #onCancelForm = (evt: any) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#waypoint);
  };
}
