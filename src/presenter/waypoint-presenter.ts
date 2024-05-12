/* eslint-disable @typescript-eslint/no-explicit-any */
import EditWaypointFormView from '../view/main/edit-waypoint-form-view';
import WaypointView from '../view/main/waypoint-view';
import type { DataBase } from './main-presenter';
import type { Waypoint } from '../types/waypoint-type';
import { render, replace, remove } from '../framework/render';

export default class WaypointPresenter {
  #mainListContainer: any;
  #waypointEditComponent: any;
  #waypointComponent: any;
  #dataBase: any;

  constructor(mainListContainer: HTMLUListElement) {
    this.#mainListContainer = mainListContainer;
  }

  init(waypointData: { waypoint: Waypoint; dataBase: DataBase }) {
    this.#dataBase = waypointData.dataBase;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new WaypointView({
      waypointData,
      onEditClick: this.#onEditClick,
    });

    this.#waypointEditComponent = new EditWaypointFormView({
      waypointData,
      onFormSubmit: this.#onFormSubmit,
      onFormCancel: this.#onFormCancel,
    });

    if (prevWaypointComponent !== null || prevWaypointEditComponent !== null) {
      render(this.#waypointComponent, this.#mainListContainer);
      return;
    }
    if (this.#mainListContainer.contains(prevWaypointComponent.element)) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mainListContainer.contains(prevWaypointEditComponent.element)) {
      replace(this.#waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
  }

  #switchToEditMode() {
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #switchToViewMode() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchToViewMode();
    }
  };

  #onEditClick = () => this.#switchToEditMode();
  #onFormSubmit = () => this.#switchToViewMode();
  #onFormCancel = () => this.#switchToViewMode();
}
