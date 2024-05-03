import CurrentTrip from '../view/header/current-trip';
import Filters from '../view/header/filters';
import Sorting from '../view/main/sorting';
import WaypointsList from '../view/main/waypoints-list';
import WaypointContainer from '../view/main/waypoint-container';
import { render } from '../render';
import WaypointListItemPresenter from './event-list-item-presenter';
import EditWaypointPresenter from './edit-waypoint-presenter';
import type WaypointsModel from '../model/waypoints-model';

const siteHeaderElement = document.querySelector('.trip-main')!;
const siteFilterElement = document.querySelector('.trip-controls__filters')!;

export default class ListPresenter {
  listContainer: HTMLElement;
  waypointsModel: WaypointsModel;
  waypointList = new WaypointsList();
  waypoint: WaypointContainer;

  constructor({ listContainer, waypointsModel }: { listContainer: HTMLElement; waypointsModel: WaypointsModel }) {
    this.listContainer = listContainer;
    this.waypointsModel = waypointsModel;
    this.waypoint = new WaypointContainer();
  }

  init() {
    render(new CurrentTrip(), siteHeaderElement, 'afterbegin');
    render(new Filters(), siteFilterElement);
    render(new Sorting(), this.listContainer);

    render(this.waypointList, this.listContainer);

    const waypoint = this.waypoint.waypoints[0];

    const editWaypointPresenterPresenter = new EditWaypointPresenter({
      editWaypointContainer: this.waypointList.element,
      waypointsModel: this.waypointsModel,
      waypoint,
      destination
    });
    editWaypointPresenterPresenter.init();

    // for (let i = 0; i < this.waypointsModel.waypoints.length; i++) {
    //   const currentWaypoint = this.waypointsModel.waypoints[i];
    //   render(new WaypointContainer(), this.waypointList.element);

    //   const siteEventListElement = document.getElementById('event_list')!;
    //   const siteCurrentEventItemElements = Array.from(siteEventListElement.children)[i] as HTMLElement;

    //   const waypointListItemPresenter = new WaypointListItemPresenter({
    //     waypointItemContainer: siteCurrentEventItemElements,
    //     waypointsModel: this.waypointsModel,
    //     waypoint: currentWaypoint,
    //   });
    //   waypointListItemPresenter.init();
    // }
  }
}
