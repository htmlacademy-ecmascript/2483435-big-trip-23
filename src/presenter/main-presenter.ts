/* eslint-disable @typescript-eslint/no-explicit-any */
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

const siteHeaderElement = document.querySelector('.trip-main')!;
const siteFilterElement = document.querySelector('.trip-controls__filters')!;

export default class ListPresenter {
  listContainer: HTMLElement;
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
  waypointsModel: WaypointsModel;
  waypointList = new WaypointsList();
  waypoint: any;
  destination: any;

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
    const waypoints = this.waypointsModel.waypoints;
    const waypoint = Randomizer.getArrayElement(waypoints);
    const waypointID = waypoint.destination;
    const destination = this.destinationsModel.getById(waypointID)!;
    const type = this.offersModel.offers.find((item) => item.type === waypoint.type);




    render(new CurrentTrip(), siteHeaderElement, 'afterbegin');
    render(new Filters(), siteFilterElement);
    render(new Sorting(), this.listContainer);
    render(this.waypointList, this.listContainer);



    const selectedOffers = type!.offers.filter((currentOffers) => waypoint.offers.includes(currentOffers.id));

    const editWaypointPresenterPresenter = new EditWaypointPresenter({
      editWaypointContainer: this.waypointList.element,
      destinationsModel: this.destinationsModel,
      offersModel: this.offersModel,
      waypointsModel: this.waypointsModel,
      waypoint,
      destination,
      type,
      selectedOffers,
    });
    editWaypointPresenterPresenter.init();

    for (let i = 0; i < this.waypointsModel.waypoints.length; i++) {
      const currentWaypoint = this.waypointsModel.waypoints[i];
      render(new WaypointContainer(), this.waypointList.element);

      const siteEventListElement = document.getElementById('event_list')!;
      const siteCurrentEventItemElements = Array.from(siteEventListElement.children)[i] as HTMLElement;

      const waypointListItemPresenter = new WaypointListItemPresenter({
        waypointItemContainer: siteCurrentEventItemElements,
        waypointsModel: this.waypointsModel,
        offersModel: this.offersModel,
        waypoint: currentWaypoint,
        destination,
        type,
      });
      waypointListItemPresenter.init();
    }
  }
}
