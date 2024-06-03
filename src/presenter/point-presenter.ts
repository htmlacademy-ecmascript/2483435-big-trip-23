import PointView from '../view/main/point';
import type { Point } from '../types/point-type';
import { render, replace, remove } from '../framework/render';
import type { EmptyFn, PointChange, PointData } from '../types/common';
import { UserAction } from '../const';
import { UpdateType } from '../const';
import dayjs from 'dayjs';
import PointFormView from '../view/main/point-form';
import { isDatesEqual } from '../utils/time/filters-time';
import type { Models } from '../model/create-models';

const enum Mode {
  DEFAULT,
  EDITING,
}

export default class PointPresenter {
  #container: HTMLUListElement;

  #pointComponent: PointView | null = null;
  #pointEditComponent: PointFormView | null = null;
  #models: Models | null = null;
  #point: Point | null = null;

  #handleDataChange: PointChange;
  #handleModeChange: EmptyFn;
  #mode = Mode.DEFAULT;

  constructor({
    container,
    onDataChange,
    onModeChange,
  }: {
    container: HTMLUListElement;
    onDataChange: PointChange;
    onModeChange: EmptyFn;
  }) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({ point, models }: PointData) {
    this.#models = models;
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      models: this.#models,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointFormView({
      point: this.#point,
      models: this.#models,
      isNewPoint: false,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onFormClose: this.#handleFormClose,
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
      this.#handleFormClose();
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
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#handleModeChange();
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
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => this.#switchToEditMode();
  #handleFormClose = () => this.#switchToViewMode();
  #handleDeleteClick = (point: Point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #handleFavoriteClick = () => {
    if (this.#point) {
      this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, { ...this.#point, isFavorite: !this.#point.isFavorite });
    }
  };

  #handleFormSubmit = (updatedPoint: Point) => {
    const point = this.#point;
    if (point) {
      const isMinorUpdate =
        !isDatesEqual(dayjs(point.dateFrom), dayjs(updatedPoint.dateFrom)) ||
        !isDatesEqual(dayjs(point.dateTo), dayjs(updatedPoint.dateTo)) ||
        point.offers !== updatedPoint.offers;

      this.#handleDataChange(UserAction.UPDATE_POINT, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, updatedPoint);
    }
  };

  #handleEscKeyDown = (evt: KeyboardEvent) => {
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
