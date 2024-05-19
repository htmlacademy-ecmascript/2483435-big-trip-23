import dayjs from 'dayjs';
import { capitalLetter } from '../../utils/utils';
import { createWaypointsTypesListTemplate } from '../../templates/new-edit-form/types-template';
import { createDestinationsListTemplate, correctName } from '../../templates/new-edit-form/destinations-template';
import { createOffersTemplate } from '../../templates/new-edit-form/offers-template';
import { createDescriptionTemplate } from '../../templates/new-edit-form/description-template';
import type { WaypointData } from '../../types/common';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import type { State } from '../../types/state';
import type { Waypoint } from '../../types/waypoint-type';
import type { DataBase } from '@presenter/main-presenter';

function getTemplate(data: State, dataBase: DataBase) {
  const { dateFrom, dateTo, type, destination, basePrice, selectedOffs } = data;

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

    ${createOffersTemplate(type, selectedOffs, dataBase)}

    ${createDescriptionTemplate(destination, dataBase)}

    </section>
    </form>
    </li>
    `;
}

export default class EditWaypointFormView extends AbstractStatefulView<State> {
  _restoreHandlers() {
    throw new Error('Method not implemented.');
  }

  #handleFormSubmit: (waypoint: Waypoint) => void;
  #handleFormCancel: () => void;
  #waypointData: WaypointData;
  #waypoint: Waypoint;
  #dataBase: DataBase;

  constructor({
    waypoint,
    dataBase,
    onFormSubmit,
    onFormCancel,
  }: WaypointData & { onFormSubmit: (waypoint: Waypoint) => void; onFormCancel: () => void }) {
    super();
    this.#waypointData = { waypoint, dataBase };
    this.#waypoint = this.#waypointData.waypoint;
    this.#dataBase = this.#waypointData.dataBase;
    this._setState(this.parseTaskToState(this.#waypoint));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormCancel = onFormCancel;
    this.element.querySelector('form')!.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')!.addEventListener('click', this.#onCancelForm);
    this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#onCancelForm);
  }

  get template() {
    return getTemplate(this._state, this.#dataBase);
  }

  #formSubmitHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.parseStateToTask());
  };

  #onCancelForm: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.parseStateToTask());
  };

  parseTaskToState(waypoint: Waypoint): State {
    return {
      ...waypoint,

      selectedOffs: new Set(waypoint.offers),
    };
  }

  parseStateToTask(): Waypoint {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectedOffs, ...waypoint } = this._state;

    return waypoint;
  }
}
