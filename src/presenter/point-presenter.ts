import PointView from '../view/main/point-view';
import type { Point } from '../types/point-type';
import { render, replace, remove } from '../framework/render';
import type { EmptyFn, PointChange, PointData } from '../types/common';
import { Mode, UserAction } from '../const';
import { UpdateType } from '../const';
import dayjs from 'dayjs';
import PointFormView from '../view/main/point-form-view';
import { isDatesEqual } from '../utils/time/filters-time';
import type { Models } from '../model/create-models';

export default class PointPresenter {
  #container: HTMLUListElement;

  #pointComponent: PointView | null = null;
  #pointEditComponent: PointFormView | null = null;
  #models: Models | null = null;
  #point: Point | null = null;

  #dataChangeHandler: PointChange;
  #modeChangeHandler: EmptyFn;
  #mode = Mode.DEFAULT;

  constructor({
    container,
    dataChangeHandler: dataChangeHandler,
    modeChangeHandler: modeChangeHandler,
  }: {
    container: HTMLUListElement;
    dataChangeHandler: PointChange;
    modeChangeHandler: EmptyFn;
  }) {
    this.#container = container;
    this.#dataChangeHandler = dataChangeHandler;
    this.#modeChangeHandler = modeChangeHandler;
  }

  init({ point, models }: PointData) {
    this.#models = models;
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      models: this.#models,
      editButtonClickHandler: this.#editButtonClickHandler,
      favoriteButtonClickHandler: this.#favoriteButtonClickHandler,
    });

    this.#pointEditComponent = new PointFormView({
      point: this.#point,
      models: this.#models,
      isNewPoint: false,
      formSubmitHandler: this.#formSubmitHandler,
      deleteButtonClickHandler: this.#deleteButtonClickHandler,
      formCloseHandler: this.#formCloseHandler,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formCloseHandler();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent?.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent?.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent?.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent?.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent?.shake(resetFormState);
  }

  #switchToEditMode() {
    if (!this.#pointComponent || !this.#pointEditComponent) {
      return;
    }
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#modeChangeHandler();
    this.#mode = Mode.EDITING;
  }

  #switchToViewMode() {
    if (!this.#pointComponent || !this.#pointEditComponent) {
      return;
    }
    if (this.#point) {
      this.#pointEditComponent.reset(this.#point);
    }
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #editButtonClickHandler = () => this.#switchToEditMode();
  #formCloseHandler = () => this.#switchToViewMode();
  #deleteButtonClickHandler = (point: Point) => {
    this.#dataChangeHandler(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #favoriteButtonClickHandler = () => {
    if (this.#point) {
      this.#dataChangeHandler(UserAction.UPDATE_POINT, UpdateType.MINOR, { ...this.#point, isFavorite: !this.#point.isFavorite });
    }
  };

  #formSubmitHandler = (updatedPoint: Point) => {
    const point = this.#point;
    if (point) {
      const isMinorUpdate =
        !isDatesEqual(dayjs(point.dateFrom), dayjs(updatedPoint.dateFrom)) ||
        !isDatesEqual(dayjs(point.dateTo), dayjs(updatedPoint.dateTo)) ||
        point.offers !== updatedPoint.offers;

      this.#dataChangeHandler(UserAction.UPDATE_POINT, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, updatedPoint);
    }
  };

  #escKeydownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (this.#pointEditComponent) {
        if (this.#point) {
          this.#pointEditComponent.reset(this.#point);
        } else {
          throw new Error('Point is null');
        }
        this.#pointEditComponent.reset(this.#point);
      } else {
        throw new Error('pointEditComponent is null');
      }
      this.#switchToViewMode();
    }
  };
}
