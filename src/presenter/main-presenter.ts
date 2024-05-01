import CurrentTrip from '../view/header/current-trip';
import Filters from '../view/header/filters';
import Sorting from '../view/main/sorting';
import WaypointsList from '../view/main/waypoints-list';
import WaypointContainer from '../view/main/waypoint-container';
import { render } from '../render';
import WaypointListItemPresenter from './event-list-item-presenter';
import EditWaypointPresenter from './edit-waypoint-presenter';
import type WaypointsModel from '../model/waypoints-model';
import { WayPoint } from '../types/way-point';

const siteHeaderElement = document.querySelector('.trip-main')!;
const siteFilterElement = document.querySelector('.trip-controls__filters')!;

export default class ListPresenter {
  listContainer: HTMLElement;
  waypointsModel: WaypointsModel;
  waypointList = new WaypointsList();
  waypoints: WayPoint[];
  waypoint: WaypointContainer;
  // offers: any;

  constructor({ listContainer, waypointsModel }: { listContainer: HTMLElement; waypointsModel: WaypointsModel }) {
    this.listContainer = listContainer;
    this.waypointsModel = waypointsModel;
    this.waypoints = [...this.waypointsModel.waypoints];
    this.waypoint = new WaypointContainer();
  }

  init() {
    render(new CurrentTrip(), siteHeaderElement, 'afterbegin');
    render(new Filters(), siteFilterElement);
    render(new Sorting(), this.listContainer);

    render(this.waypointList, this.listContainer);

    const waypoint = this.waypoints[0];

    const editWaypointPresenterPresenter = new EditWaypointPresenter({
      editWaypointContainer: this.waypointList.element,
      waypointsModel: this.waypointsModel,
      waypoint,
    });
    editWaypointPresenterPresenter.init();

    for (let i = 0; i < this.waypoints.length; i++) {
      const currentWaypoint = this.waypoints[i];
      render(new WaypointContainer(), this.waypointList.element);

      const siteEventListElement = document.getElementById('event_list')!;
      const siteCurrentEventItemElements = Array.from(siteEventListElement.children)[i] as HTMLElement;

      const waypointListItemPresenter = new WaypointListItemPresenter({
        waypointItemContainer: siteCurrentEventItemElements,
        waypointsModel: this.waypointsModel,
        waypoint: currentWaypoint,
      });
      waypointListItemPresenter.init();
    }
  }
}
