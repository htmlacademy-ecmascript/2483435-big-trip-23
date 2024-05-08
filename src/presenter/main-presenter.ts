import CurrentTrip from '../view/header/current-trip';
import Filters from '../view/header/filters';
import Sorting from '../view/main/sorting';
import WaypointsList from '../view/main/waypoints-list';
import WaypointContainer from '../view/main/waypoint-container';
import { render } from '../render';
import WaypointListItemPresenter from './event-list-item-presenter';
import EditWaypointPresenter from './edit-waypoint-presenter';
import type WaypointsModel from '../model/waypoints-model';
import type DestinationsModel from '../model/destinations-model';
import type OffersModel from '../model/offers-model';
import { Randomizer } from '../utils/random';
import { Waypoint } from '../types/way-point';

const siteHeaderElement = document.querySelector('.trip-main')!;
const siteFilterElement = document.querySelector('.trip-controls__filters')!;

export default class ListPresenter {
  listContainer: HTMLElement;
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
  waypointsModel: WaypointsModel;
  waypointList = new WaypointsList();

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
  }

  init() {
    render(new CurrentTrip(), siteHeaderElement, 'afterbegin');
    render(new Filters(), siteFilterElement);
    render(new Sorting(), this.listContainer);
    render(this.waypointList, this.listContainer);

    const waypoints = this.waypointsModel.waypoints;
    const waypoint = Randomizer.getArrayElement(waypoints);
    const destination = this.destinationsModel.getDestination(waypoint)!;
    const availableOffers = this.offersModel.getAvailableOffers(waypoint)!;
    const selectedOffers = this.offersModel.getSelectedOffers(waypoint);

    const editWaypointPresenter = new EditWaypointPresenter({
      editContainer: this.waypointList.element,
      destinationsModel: this.destinationsModel,
      offersModel: this.offersModel,
      waypointsModel: this.waypointsModel,
      waypoint,
      destination,
      availableOffers,
      selectedOffers,
    });
    editWaypointPresenter.init();

    for (let i = 1; i < waypoints.length; i++) {
      this.#renderWaypoint(waypoints[i], this.waypointList.element, i);
    }
  }


  #renderWaypoint(currentWaypoint: Waypoint, container: HTMLUListElement,indexNumber : number) {
    render(new WaypointContainer(), container);

    const siteEventListElement = document.getElementById('event_list')!;
    const siteCurrentEventItemElements = Array.from(siteEventListElement.children)[indexNumber] as HTMLElement;

    const waypointListItemPresenter = new WaypointListItemPresenter({
      waypointItemContainer: siteCurrentEventItemElements,
      destinationsModel: this.destinationsModel,
      offersModel: this.offersModel,
      waypointsModel: this.waypointsModel,
      currentWaypoint,
    });
    waypointListItemPresenter.init();
  }
}
