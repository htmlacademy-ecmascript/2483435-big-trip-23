/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CurrentTrip from '../view/header/current-trip';
import Filters from '../view/header/filters';
import Sorting from '../view/main/sorting';
import WaypointsList from '../view/main/waypoints-list';
import Waypoint from '../view/main/waypoint-container';
import { render } from '../render';
import WaypointListItemPresenter from './event-list-item-presenter';
import EditWaypointPresenter from './edit-waypoint-presenter';


const siteHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');


export default class ListPresenter {
  listContainer: HTMLUListElement;
  waypointsModel: any;
  waypointList = new WaypointsList();
  waypoints: any;
  waypoint: any;
  offers: any;

  constructor({ listContainer, waypointsModel }: { listContainer: any; waypointsModel: any }) {
    this.listContainer = listContainer;
    this.waypointsModel = waypointsModel;
    this.waypoints = [...this.waypointsModel.waypoints];
    this.waypoint = new Waypoint();
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
      waypoint
    });
    editWaypointPresenterPresenter.init();


    for (let i = 0; i < this.waypoints.length; i++) {
      const currentWaypoint = this.waypoints[i];
      render(new Waypoint(), this.waypointList.element);

      const siteEventListElement = document.getElementById('event_list')!;
      const siteCurrentEventItemElements = Array.from(siteEventListElement.children)[i];

      const waypointListItemPresenter = new WaypointListItemPresenter({
        waypointItemContainer: siteCurrentEventItemElements,
        waypointsModel: this.waypointsModel,
        waypoint: currentWaypoint
      });
      waypointListItemPresenter.init();
    }
  }
}
