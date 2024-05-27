/* eslint-disable @typescript-eslint/no-explicit-any */
import PointView from '../view/main/point-view';
import type { Point } from '../types/point-type';
import { render, replace, remove } from '../framework/render';
import type { EmptyFn, PointData } from '../types/common';
import type { DataBase } from './main-presenter';
import { UserAction } from '../const';
import { UpdateType } from '../const';
import dayjs from 'dayjs';
import PointFormView from '../view/main/point-form-view';
import { isDatesEqual } from '../utils/time/time-for-filters';

const enum Mode {
  DEFAULT,
  EDITING,
}

type PointChange = (actionType: UserAction, updateType: UpdateType, update: any) => void;

export default class PointPresenter {
  #mainListContainer: HTMLUListElement;

  #pointComponent: PointView | null = null;
  #pointEditComponent: PointFormView | null = null;
  #dataBase: DataBase | null = null;
  #point: Point | null = null;

  #handleDataChange: PointChange;
  #handleModeChange: EmptyFn;
  #mode = Mode.DEFAULT;

  constructor({
    mainListContainer,
    onDataChange,
    onModeChange,
  }: {
    mainListContainer: HTMLUListElement;
    onDataChange: PointChange;
    onModeChange: EmptyFn;
  }) {
    this.#mainListContainer = mainListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({ point, dataBase }: PointData) {
    this.#dataBase = dataBase;
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      dataBase: this.#dataBase,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointFormView({
      point: this.#point,
      dataBase: this.#dataBase,
      isNewPoint: false,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onFormClose: this.#handleFormClose,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#mainListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
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
      this.#onDeleteClick();
    }
  }

  #switchToEditMode() {
    if (!this.#pointComponent || !this.#pointEditComponent) {
      return;
    }
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #switchToViewMode() {
    if (!this.#pointComponent || !this.#pointEditComponent) {
      return;
    }
    this.#pointEditComponent!.reset(this.#point!);
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent!.reset(this.#point!);
      this.#switchToViewMode();
    }
  };

  #handleFavoriteClick = () => {
    if (this.#point) {
      this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, { ...this.#point, isFavorite: !this.#point.isFavorite });
    }
  };

  #handleEditClick = () => this.#switchToEditMode();
  #onDeleteClick = () => this.#switchToViewMode();
  #handleFormClose = () => this.#switchToViewMode();

  #handleFormSubmit = (updatePoint: Point) => {
    const isMinorUpdate =
      !isDatesEqual(dayjs(this.#point!.dateFrom), dayjs(updatePoint.dateFrom)) ||
      !isDatesEqual(dayjs(this.#point!.dateTo), dayjs(updatePoint.dateTo)) ||
      this.#point?.offers !== updatePoint.offers;

    this.#handleDataChange(UserAction.UPDATE_POINT, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, updatePoint);
    this.#switchToViewMode();
  };

  #handleDeleteClick = (point: Point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };
}
