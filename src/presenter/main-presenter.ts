/* eslint-disable @typescript-eslint/no-explicit-any */
import CurrentTrip from '../view/header/current-trip';
import Filters from '../view/header/filters';
import Sorting from '../view/main/sorting';
import WaypointsList from '../view/main/waypoints-list';
import { render } from '../framework/render';
import WaypointListItemPresenter from './event-list-item-presenter';
import EditWaypointPresenter from './edit-waypoint-presenter';
import type WaypointsModel from '../model/waypoints-model';
import type DestinationsModel from '../model/destinations-model';
import type OffersModel from '../model/offers-model';
import type { Waypoint } from '../types/way-point';
import WaypointContainer from '../view/main/waypoint-container';

const siteHeaderElement = document.querySelector('.trip-main')!;
const siteFilterElement = document.querySelector('.trip-controls__filters')!;

export default class ListPresenter {
  listContainer: HTMLElement;
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
  waypointsModel: WaypointsModel;
  waypointList = new WaypointsList();
  waypoints: Waypoint[] = [];
  waypointContainer: any;

  constructor({
    listContainer,
    destinationsModel,
    offersModel,
    waypointsModel,
  }: {
    listContainer: HTMLElement;
    destinationsModel: DestinationsModel;
    offersModel: OffersModel;
    waypointsModel: WaypointsModel;
  }) {
    this.listContainer = listContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.waypointsModel = waypointsModel;
    this.waypoints = this.waypointsModel.waypoints;
    this.waypointContainer = new WaypointContainer();
  }

  init() {
    render(new CurrentTrip(), siteHeaderElement, 'afterbegin');
    render(new Filters(), siteFilterElement);
    render(new Sorting(), this.listContainer);

    if (this.waypoints.length !== 0) {
      this.#renderWaypoints(this.waypoints);
    }
  }

  #renderWaypoints(waypoints: Waypoint[]) {
    render(this.waypointList, this.listContainer);

    for (const waypoint of waypoints) {
      const li = new WaypointContainer();

      render(li, this.waypointList.element);

      this.#renderWaypoint(waypoint, li.element);
    }
  }

  #renderWaypoint(currentWaypoint: Waypoint, container: HTMLLIElement) {
    const handlers = {
      onEditClick: () => {
        container.innerHTML = '';
        this.#editWaypoint(currentWaypoint, container);
      },
    };

    const waypointListItemPresenter = new WaypointListItemPresenter({
      container: container,
      destinationsModel: this.destinationsModel,
      offersModel: this.offersModel,
      waypointsModel: this.waypointsModel,
      currentWaypoint,
      handlers,
    });

    waypointListItemPresenter.init();
  }

  #editWaypoint(currentWaypoint: Waypoint, container: HTMLLIElement) {
    const escKeyDownHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        container.innerHTML = '';
        this.#renderWaypoint(currentWaypoint, container);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const handlers = {
      onFormSubmit: () => {
        container.innerHTML = '';
        this.#renderWaypoint(currentWaypoint, container);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    };

    const editWaypointPresenter = new EditWaypointPresenter({
      container: container,
      destinationsModel: this.destinationsModel,
      offersModel: this.offersModel,
      waypointsModel: this.waypointsModel,
      waypoint: currentWaypoint,
      handlers,
    });

    editWaypointPresenter.init();
  }
}
