/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { capitalLetter } from '../../utils/utils';
import { createWaypointsTypesListTemplate } from '../../templates/new-edit-form/types-template';
import { createDestinationsListTemplate, correctName } from '../../templates/new-edit-form/destinations-template';
import { createOffersTemplate } from '../../templates/new-edit-form/offers-template';
import { createDescriptionTemplate } from '../../templates/new-edit-form/description-template';
import type { WaypointData } from '../../types/common';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import type { State } from '../../types/state';
import { getAvailableOffers, getSelectedOffers } from '../../utils/offers';


function getTemplate(data: State) {
  const { dateFrom, dateTo, type, destination, basePrice, dataBase, availableOffers, selectedOffers } = data;

  const correctType = capitalLetter(type);

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
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${correctName(destination, dataBase)}" list="destination-list-1">
      <datalist id="destination-list-1">

      ${createDestinationsListTemplate(destination, dataBase)}

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

    ${createDescriptionTemplate(destination, dataBase)}

    </section>
    </form>
    </li>
    `;
}

export default class EditWaypointFormView extends AbstractStatefulView<any> {
  _restoreHandlers() {
    throw new Error('Method not implemented.');
  }

  #handleFormSubmit: any;
  #handleFormCancel: any;
  #waypointData: WaypointData;

  constructor({ waypoint, dataBase, onFormSubmit, onFormCancel }: WaypointData & { onFormSubmit: any; onFormCancel: any }) {
    super();
    this.#waypointData = {waypoint, dataBase};
    this._setState(EditWaypointFormView.parseTaskToState(this.#waypointData));


    // this.#handleFormSubmit = onFormSubmit;
    // this.#handleFormCancel = onFormCancel;
    // this.element.querySelector('form')!.addEventListener('submit', this.#formSubmitHandler);
    // this.element.querySelector('.event__reset-btn')!.addEventListener('click', this.#onCancelForm);
    // this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#onCancelForm);
  }

  get template() {
    return getTemplate(this._state);
  }

  #formSubmitHandler = (evt: any) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditWaypointFormView.parseStateToTask(this._state));
  };

  #onCancelForm = (evt: any) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditWaypointFormView.parseStateToTask(this._state));
  };

  static parseTaskToState(waypointData: WaypointData) {
    const {waypoint} = waypointData;

    return {...waypoint,

      availableOffers: getAvailableOffers(waypointData),
      selectedOffers: getSelectedOffers(waypointData),

    };
  }

  static parseStateToTask(state: typeof this.parseTaskToState) {
    const waypoint = {...state};

    return waypoint;
  }
}
