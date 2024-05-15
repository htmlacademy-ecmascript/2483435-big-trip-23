import EditWaypointFormView from '../view/main/edit-waypoint-form-view';
import WaypointView from '../view/main/waypoint-view';
import type { Waypoint } from '../types/waypoint-type';
import { render, replace, remove } from '../framework/render';
import type { WaypointData } from '../types/common';
import type { DataBase } from './main-presenter';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class WaypointPresenter {
  #mainListContainer: HTMLUListElement;

  #waypointComponent: WaypointView | null = null;
  #waypointEditComponent: EditWaypointFormView | null = null;
  #dataBase: DataBase | null = null;
  #waypoint: Waypoint | null = null;

  #handleDataChange: (point: Waypoint) => void;
  // #waypointData: any = null;
  #handleModeChange: () => void;
  #mode = Mode.DEFAULT;

  constructor({
    mainListContainer,
    onDataChange,
    onModeChange,
  }: {
    mainListContainer: HTMLUListElement;
    onDataChange: (point: Waypoint) => void;
    onModeChange: () => void;
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
    if (this.#waypoint) {
      this.#handleDataChange({ ...this.#waypoint, isFavorite: !this.#waypoint.isFavorite });
    }
  };

  #handleEditClick = () => this.#switchToEditMode();
  #onFormCancel = () => this.#switchToViewMode();

  #handleFormSubmit = (waypoint: Waypoint) => {
    this.#switchToViewMode();
    this.#handleDataChange(waypoint);
  };
}
