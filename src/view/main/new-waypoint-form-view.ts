import dayjs from 'dayjs';
import { capitalLetter } from '../../utils/utils';
import { createWaypointsTypesListTemplate } from '../../templates/new-edit-form/types-template';
import { createDestinationsListTemplate, correctName } from '../../templates/new-edit-form/destinations-template';
import { createOffersTemplate } from '../../templates/new-edit-form/offers-template';
import { createDescriptionTemplate } from '../../templates/new-edit-form/description-template';
import type { WaypointData } from '../../types/common';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import type { State } from '../../types/state';
import type { Waypoint, WaypointType } from '../../types/waypoint-type';
import type { DataBase } from '@presenter/main-presenter';
import type { Destination } from '../../types/destination-type';
import flatpickr from 'flatpickr';
import type { Instance as Flatpickr } from 'flatpickr/dist/types/instance';
import type { Hook as FlatpickerHook } from 'flatpickr/dist/types/options';

import 'flatpickr/dist/flatpickr.min.css';
import { createPicturesTemplate } from '../../templates/new-edit-form/pictures-template';
import { isSameWaypoints } from '../../utils/waypoint';

function getTemplate(data: State, dataBase: DataBase) {
  const { dateFrom, dateTo, type, destination, basePrice, selectedOffs } = data;

  const correctType = capitalLetter(type);

  const timeStart = dateFrom === '' ? '' : dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const timeEnd = dateTo === '' ? '' : dayjs(dateTo).format('DD/MM/YY HH:mm');

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
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? correctName(destination, dataBase) : ''}" list="destination-list-1" required>
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
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice ?? null}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
    <span class="visually-hidden">Open event</span>
    </button>
    </header>
    <section class="event__details">

    ${createOffersTemplate(type, selectedOffs, dataBase) ?? null}

    ${createDescriptionTemplate(destination, dataBase)}

    ${createPicturesTemplate(destination, dataBase)}

    </section>
    </form>
    </li>
    `;
}

export default class NewWaypointFormView extends AbstractStatefulView<State> {
  #handleFormSubmit: (updateWaypoint: Waypoint) => void;
  #handleDeleteClick: (waypoint: Waypoint) => void;
  #waypointData: WaypointData;
  #waypoint: Waypoint;
  #dataBase: DataBase;
  #allDestinations: Destination['name'][];
  #allDestinationsIDs: Destination['id'][];
  #dateStart: Flatpickr | null = null;
  #dateFinish: Flatpickr | null = null;

  constructor({
    waypoint,
    dataBase,
    onFormSubmit,
    onDeleteClick,
  }: WaypointData & { onFormSubmit: (updateWaypoint: Waypoint) => void; onDeleteClick: (waypoint: Waypoint) => void }) {
    super();
    this.#waypointData = { waypoint, dataBase };
    this.#waypoint = this.#waypointData.waypoint;
    this.#dataBase = this.#waypointData.dataBase;
    this.#allDestinations = this.#dataBase.destinationsModel.allDestinationsNames;
    this.#allDestinationsIDs = this.#dataBase.destinationsModel.allDestinationsIDs;
    this._setState(this.parseWaypointToState(this.#waypoint));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return getTemplate(this._state, this.#dataBase);
  }

  removeElement() {
    super.removeElement();

    if (this.#dateStart) {
      this.#dateStart.destroy();
      this.#dateStart = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form')!.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')!.addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__type-list')!.addEventListener('click', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')!.addEventListener('input', this.#destinationChangeHandler);
    this.element.querySelector('.event__details')!.addEventListener('input', this.#selectedOffersHandler);

    this.#setEventStart();
    this.#setEventFinish();
  }

  #onCancelForm: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.parseStateToWaypoint());
  };

  #typeChangeHandler: EventListener = (evt) => {
    if (!(evt.target instanceof HTMLLabelElement)) {
      return;
    }
    const selectedType = ((evt.target! as HTMLLabelElement).previousElementSibling! as HTMLInputElement).value as WaypointType;
    evt.preventDefault();
    this.updateElement({
      type: selectedType,
      selectedOffs: new Set(this.#dataBase.offersModel.getAvailableOffersIDs(selectedType)),
    });
  };

  #destinationChangeHandler: EventListener = (evt) => {
    const select = (evt.target as HTMLInputElement).value;

    if (!this.#allDestinations.includes(select)) {
      return;
    }

    const selectedDestination = this.#dataBase.destinationsModel.getDestinationByName(select)!.id;
    evt.preventDefault();
    this.updateElement({
      destination: selectedDestination,
    });
  };

  #selectedOffersHandler: EventListener = (evt) => {
    if (!(evt.target instanceof HTMLInputElement)) {
      return;
    }

    const selectedOffers = () => {
      const offers = this._state.selectedOffs;
      const event = evt.target as HTMLInputElement;
      const offerID = event.id.split('-').slice(2, -1).join('-');

      if (offers.has(offerID)) {
        offers.delete(offerID);
      } else {
        offers.add(offerID);
      }

      return offers;
    };

    this._setState({
      selectedOffs: selectedOffers(),
    });
  };

  reset(waypoint: Waypoint) {
    this.updateElement(this.parseWaypointToState(waypoint));
  }

  #formSubmitHandler: EventListener = (evt) => {
    evt.preventDefault();
    if (
      this._state.dateFrom !== '' &&
      this._state.dateTo !== '' &&
      this.#allDestinationsIDs.includes(this._state.destination) &&
      isSameWaypoints(this.#dataBase.waypointsModel.waypoints, this.parseStateToWaypoint())
    ) {
      this.#handleFormSubmit(this.parseStateToWaypoint());
    }
  };

  #formDeleteClickHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this.parseStateToWaypoint());
  };

  #startDateChangeHandler: FlatpickerHook = ([userDate]) => {
    if (new Date(userDate) > new Date(this._state.dateTo)) {
      this._state.dateTo = userDate.toString();
    }
    this.updateElement({
      dateFrom: userDate.toString(),
    });
  };

  #finishDateChangeHandler: FlatpickerHook = ([userDate]) => {
    this.updateElement({
      dateTo: userDate.toString(),
    });
  };

  #setEventStart() {
    this.#dateStart = flatpickr(this.element.querySelectorAll('.event__input--time')[0], {
      minDate: 'today',
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'j\\/m\\/y H\\:i',
      onChange: this.#startDateChangeHandler,
    });
  }

  #setEventFinish() {
    const currentStartDate = this._state.dateFrom === '' ? 'today' : new Date(this._state.dateFrom);

    this.#dateFinish = flatpickr(this.element.querySelectorAll('.event__input--time')[1], {
      minDate: currentStartDate,
      enableTime: true,
      'time_24hr': true,
      static: true,
      dateFormat: 'j\\/m\\/y H\\:i',
      onChange: this.#finishDateChangeHandler,
    });
  }

  parseWaypointToState(waypoint: Waypoint): State {
    return {
      ...waypoint,

      selectedOffs: new Set(waypoint.offers),
    };
  }

  parseStateToWaypoint(): Waypoint {
    const { ...waypoint } = this._state;

    waypoint!.offers = Array.from(this._state.selectedOffs);

    return waypoint;
  }
}
