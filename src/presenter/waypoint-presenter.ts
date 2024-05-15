import EditWaypointFormView from '../view/main/edit-waypoint-form-view';
import WaypointView from '../view/main/waypoint-view';
import type { Waypoint } from '../types/waypoint-type';
import { render, replace, remove } from '../framework/render';
import type { WaypointData } from '../types/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class WaypointPresenter {
  #mainListContainer: HTMLUListElement;
  #waypointEditComponent: EditWaypointFormView | null = null;
  #waypointComponent: WaypointView | null = null;
  // #dataBase: any = null;
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
    // this.#dataBase = dataBase;
    this.#waypoint = waypoint;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new WaypointView({
      waypoint,
      dataBase,
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#waypointEditComponent = new EditWaypointFormView({
      waypoint,
      dataBase,
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

  #onEditClick = () => this.#switchToEditMode();
  #onFormCancel = () => this.#switchToViewMode();
  #onFavoriteClick = () => this.#handleFavoriteClick();

  #onFormSubmit = (waypoint: Waypoint) => {
    this.#switchToViewMode();
    this.#handleDataChange(waypoint);
  };
}
