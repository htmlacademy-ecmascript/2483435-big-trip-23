/* eslint-disable @typescript-eslint/no-explicit-any */
import EditWaypointFormView from '../view/main/edit-waypoint-form-view';
import WaypointView from '../view/main/waypoint-view';
import type { Waypoint } from '../types/waypoint-type';
import { render, replace, remove } from '../framework/render';
import type { EmptyFn, WaypointData } from '../types/common';
import type { DataBase } from './main-presenter';
import type { UserAction } from '../const';
import { UpdateType } from '../const';
import { isDatesEqual } from '../utils/time';
import dayjs from 'dayjs';

const enum Mode {
  DEFAULT,
  EDITING,
}

type WayPointChange = (actionType: UserAction, updateType: UpdateType, update: any) => void;

export default class WaypointPresenter {
  #mainListContainer: HTMLUListElement;

  #waypointComponent: WaypointView | null = null;
  #waypointEditComponent: EditWaypointFormView | null = null;
  #dataBase: DataBase | null = null;
  #waypoint: Waypoint | null = null;

  #handleDataChange: WayPointChange;
  #handleModeChange: EmptyFn;
  #mode = Mode.DEFAULT;

  constructor({
    mainListContainer,
    onDataChange,
    onModeChange,
  }: {
    mainListContainer: HTMLUListElement;
    onDataChange: WayPointChange;
    onModeChange: EmptyFn;
  }) {
    this.#mainListContainer = mainListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({ waypoint, dataBase }: WaypointData) {
    this.#dataBase = dataBase;
    this.#waypoint = waypoint;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new WaypointView({
      waypoint: this.#waypoint,
      dataBase: this.#dataBase,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#waypointEditComponent = new EditWaypointFormView({
      waypoint: this.#waypoint,
      dataBase: this.#dataBase,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this.#waypointComponent, this.#mainListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#onDeleteClick();
    }
  }

  #switchToEditMode() {
    if (!this.#waypointComponent || !this.#waypointEditComponent) {
      return;
    }
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #switchToViewMode() {
    if (!this.#waypointComponent || !this.#waypointEditComponent) {
      return;
    }
    this.#waypointEditComponent!.reset(this.#waypoint!);
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#waypointEditComponent!.reset(this.#waypoint!);
      this.#switchToViewMode();
    }
  };

  #handleFavoriteClick = () => {
    if (this.#waypoint) {
      this.#handleDataChange('updateWaypoint', UpdateType.MINOR, { ...this.#waypoint, isFavorite: !this.#waypoint.isFavorite });
    }
  };

  #handleEditClick = () => this.#switchToEditMode();
  #onDeleteClick = () => this.#switchToViewMode();

  #handleFormSubmit = (updateWaypoint: Waypoint) => {
    const isMinorUpdate =
      !isDatesEqual(dayjs(this.#waypoint!.dateFrom), dayjs(updateWaypoint.dateFrom)) ||
      !isDatesEqual(dayjs(this.#waypoint!.dateTo), dayjs(updateWaypoint.dateTo)) ||
      this.#waypoint?.offers !== updateWaypoint.offers;

    this.#handleDataChange('updateWaypoint', isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, updateWaypoint);
    this.#switchToViewMode();
  };

  #handleDeleteClick = (waypoint: Waypoint) => {
    this.#handleDataChange('deleteWaypoint', UpdateType.MINOR, waypoint);
  };
}