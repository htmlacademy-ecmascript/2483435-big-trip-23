/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Waypoint } from '../types/waypoint-type';
import { render, remove } from '../framework/render';
import type { EmptyFn } from '../types/common';
import type { DataBase } from './main-presenter';
import { UserAction } from '../const';
import { UpdateType } from '../const';
import NewWaypointFormView from '../view/main/new-waypoint-form-view';
import { DEFAULT_WAYPOINT } from '../mock/const';

type WayPointChange = (actionType: UserAction, updateType: UpdateType, update: any) => void;

export default class NewWaypointPresenter {
  #mainListContainer: any;
  #handleDataChange: WayPointChange;
  #handleDestroy: EmptyFn;
  #waypointNewComponent: NewWaypointFormView | null = null;
  #dataBase: DataBase;
  #waypoint: Waypoint;

  constructor({
    mainListContainer,
    dataBase,
    onDataChange,
    onDestroy,
  }: {
    mainListContainer: HTMLUListElement;
    dataBase: DataBase;
    onDataChange: WayPointChange;
    onDestroy: EmptyFn;
  }) {
    this.#mainListContainer = mainListContainer;
    this.#dataBase = dataBase;
    this.#waypoint = DEFAULT_WAYPOINT;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    this.#waypoint.id = crypto.randomUUID();
    if (this.#waypointNewComponent !== null) {
      return;
    }

    this.#waypointNewComponent = new NewWaypointFormView({
      waypoint: this.#waypoint,
      dataBase: this.#dataBase,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });
    render(this.#waypointNewComponent, this.#mainListContainer, 'afterbegin');

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#waypointNewComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#waypointNewComponent);
    this.#waypointNewComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (newWaypoint: Waypoint) => {
    this.#handleDataChange(UserAction.addWaypoint, UpdateType.MINOR, { ...newWaypoint });
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
