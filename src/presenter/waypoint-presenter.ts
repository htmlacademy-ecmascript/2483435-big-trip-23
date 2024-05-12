/* eslint-disable @typescript-eslint/no-explicit-any */
import EditWaypointFormView from '../view/main/edit-waypoint-form-view';
import WaypointView from '../view/main/waypoint-view';
import type { DataBase } from './main-presenter';
import type { Waypoint } from '../types/waypoint-type';
import { render, replace } from '../framework/render';

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

    this.#waypointComponent = new WaypointView({
      waypointData,
      onEditClick: this.#onEditClick,
    });

    this.#waypointEditComponent = new EditWaypointFormView({
      waypointData,
      onFormSubmit: this.#onFormSubmit,
      onFormCancel: this.#onFormCancel,
    });

    render(this.#waypointComponent, this.#mainListContainer);
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
