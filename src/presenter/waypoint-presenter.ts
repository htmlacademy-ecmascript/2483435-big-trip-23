/* eslint-disable @typescript-eslint/no-explicit-any */
import EditWaypointFormView from '../view/main/edit-waypoint-form-view';
import WaypointView from '../view/main/waypoint-view';
import type { DataBase } from './main-presenter';
import type { Waypoint } from '../types/waypoint-type';
import { render, replace, remove } from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class WaypointPresenter {
  #mainListContainer: any = null;
  #waypointEditComponent: any = null;
  #waypointComponent: any = null;
  #dataBase: any = null;
  #waypoint: any = null;
  #handleDataChange: any = null;
  #waypointData: any = null;
  #handleModeChange: any = null;
  #mode = Mode.DEFAULT;

  constructor({
    mainListContainer,
    onDataChange,
    onModeChange,
  }: {
    mainListContainer: HTMLUListElement;
    onDataChange: any;
    onModeChange: any;
  }) {
    this.#mainListContainer = mainListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(waypointData: { waypoint: Waypoint; dataBase: DataBase }) {
    this.#waypointData = waypointData;
    this.#dataBase = this.#waypointData.dataBase;
    this.#waypoint = this.#waypointData.waypoint;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new WaypointView({
      waypointData: this.#waypointData,
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#waypointEditComponent = new EditWaypointFormView({
      waypointData: this.#waypointData,
      onFormSubmit: this.#onFormSubmit,
      onFormCancel: this.#onFormCancel,
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
      this.#onFormCancel();
    }
  }

  #switchToEditMode() {
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #switchToViewMode() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchToViewMode();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#waypoint, isFavorite: !this.#waypoint.isFavorite });
  };

  #onEditClick = () => this.#switchToEditMode();
  #onFormCancel = () => this.#switchToViewMode();
  #onFavoriteClick = () => this.#handleFavoriteClick();

  #onFormSubmit = (waypoint: Waypoint) => {
    this.#switchToViewMode();
    this.#handleDataChange(waypoint);
  };
}
