import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { getFormTemplate, FormNames } from '../../templates/form/form-template';
import type { PointData } from '../../types/common';
import type { State } from '../../types/state';
import type { Point } from '../../types/point-type';
import { handleDestinationChange, handleSelectedOffers, handleTypeChange } from '../../utils/point-form';
import type { DataBase } from '@presenter/main-presenter';
import type { Instance as Flatpickr } from 'flatpickr/dist/types/instance';
import 'flatpickr/dist/flatpickr.min.css';
import { setEventFinish, setEventStart } from '../../utils/time/time-for-form';

export type PointForm = HTMLFormElement & {
  [FormNames.Price]: HTMLInputElement;
  [FormNames.Type]: RadioNodeList;
  [FormNames.Destination]: HTMLSelectElement;
};

export default class PointFormView extends AbstractStatefulView<State> {
  #handleFormSubmit: (updatePoint: Point) => void;
  #handleDeleteClick: (point: Point) => void;
  #handleFormClose: () => void;
  #pointData: PointData;
  #point: Point;
  #dataBase: DataBase;
  dateStart: Flatpickr | null = null;
  dateFinish: Flatpickr | null = null;
  #form: PointForm | null = null;
  #isNewPoint: boolean;

  constructor({
    point,
    dataBase,
    onFormSubmit,
    onDeleteClick,
    onFormClose,
    isNewPoint,
  }: PointData & {
    isNewPoint: boolean;
    onFormSubmit: (updatePoint: Point) => void;
    onDeleteClick: (point: Point) => void;
    onFormClose: () => void | null;
  }) {
    super();
    this.#pointData = { point, dataBase };
    this.#point = this.#pointData.point;
    this.#dataBase = this.#pointData.dataBase;
    this.#isNewPoint = isNewPoint;
    this._setState(this.parsePointToState(this.#point));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleFormClose = onFormClose;

    this._restoreHandlers();
  }

  get template() {
    return getFormTemplate(this._state, this.#dataBase, this.#isNewPoint);
  }

  removeElement() {
    super.removeElement();
  }

  _restoreHandlers() {
    this.#form = this.element.querySelector<PointForm>('form')!;
    this.#form.addEventListener('input', this.#changeHandler);
    this.#form.addEventListener('submit', this.#formSubmitHandler);
    this.#form.querySelector('.event__reset-btn')!.addEventListener('click', this.#formDeleteHandler);
    this.#form.querySelector('.event__rollup-btn')!.addEventListener('click', this.#formCloseHandler);

    this.#setDateFrom();
    this.#setDateTo();
  }

  parseFormToState(): Partial<State> {
    const priceInput = this.#form!['event-price'];
    const price = Number(priceInput.value);

    return {
      basePrice: Number.isInteger(price) ? price : 0,
    };
  }

  #changeHandler: EventListener = (evt) => {
    if (evt.target instanceof HTMLInputElement) {
      const input = evt.target;

      switch (input.name) {
        case FormNames.Type:
          return this.#typeChangeHandler(evt);
        case FormNames.Price:
          this._state.basePrice = Number(input.value);
          break;
        case FormNames.Destination:
          return this.#destinationChangeHandler(evt);
        default:
          return this.#selectedOffersHandler(evt);
      }
    }
  };

  #typeChangeHandler: EventListener = (evt) => handleTypeChange(this, evt);
  #destinationChangeHandler: EventListener = (evt) => handleDestinationChange(this, evt, this.#dataBase);
  #selectedOffersHandler: EventListener = (evt) => handleSelectedOffers(this, evt);

  #setDateFrom = () => setEventStart(this);
  #setDateTo = () => setEventFinish(this);

  reset(point: Point) {
    this.updateElement(this.parsePointToState(point));
  }

  #formSubmitHandler: EventListener = (evt) => {
    evt.preventDefault();
    if (this._state.dateFrom !== '' && this._state.dateTo !== '') {
      this.#handleFormSubmit(this.parseStateToPoint());
    }
  };

  #formDeleteHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this.parseStateToPoint());
  };

  #formCloseHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  parsePointToState(point: Point): State {
    return {
      ...point,

      selectedOffers: new Set(point.offers),
    };
  }

  parseStateToPoint(): Point {
    const { ...point } = this._state;
    point!.offers = Array.from(this._state.selectedOffers);

    if (!Number.isInteger(point.basePrice)) {
      point.basePrice = 0;
    }
    return point;
  }
}
