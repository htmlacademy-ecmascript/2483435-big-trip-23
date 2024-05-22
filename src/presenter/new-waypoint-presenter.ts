/* eslint-disable @typescript-eslint/no-explicit-any */
import EditWaypointFormView from '../view/main/edit-waypoint-form-view';
import type { Waypoint } from '../types/waypoint-type';
import { render, remove } from '../framework/render';
import type { EmptyFn } from '../types/common';
import type { DataBase } from './main-presenter';
import type { UpdateType, UserAction } from '../const';


type WayPointChange = (actionType: UserAction, updateType: UpdateType, update: any) => void;

export default class NewWaypointPresenter {
  #mainListContainer: any;
  #handleDataChange: WayPointChange;
  #handleDestroy: EmptyFn;
  #waypointEditComponent: EditWaypointFormView | null = null;
  #dataBase: DataBase;
  #waypoint: Waypoint;

  constructor({
    mainListContainer,
    waypoint,
    dataBase,
    onDataChange,
    onDestroy,
  }: {
    mainListContainer: HTMLUListElement;
    waypoint: Waypoint;
    dataBase: DataBase;
    onDataChange: WayPointChange;
    onDestroy: EmptyFn;
  }) {
    this.#mainListContainer = mainListContainer;
    this.#dataBase = dataBase;
    this.#waypoint = waypoint;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {

    if (this.#waypointEditComponent !== null) {
      return;
    }

    this.#waypointEditComponent = new EditWaypointFormView({
      waypoint: this.#waypoint,
      dataBase: this.#dataBase,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#waypointEditComponent, this.#mainListContainer, 'afterbegin');

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }


  destroy() {
    if (this.#waypointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#waypointEditComponent);
    this.#waypointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (newWaypoint: Waypoint) => {
    this.#handleDataChange('addWaypoint', 'minor', { ...newWaypoint });
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
