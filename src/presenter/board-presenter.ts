/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CurrentTrip from '../view/current-trip';
import Filters from '../view/filters';
import Sorting from '../view/sorting';
import WaypointsList from '../view/waypoints-list';
import Waypoint from '../view/waypoint';
import NewPoint from '../view/new-point';
import PointContent from '../view/point-content';
import { render } from '../render';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  boardContainer: HTMLElement;
  waypointsModel: any;
  waypointList = new WaypointsList();
  waypoints: any;

  constructor({ boardContainer, waypointsModel }: { boardContainer: any, waypointsModel: any }) {
    this.boardContainer = boardContainer;
    this.waypointsModel = waypointsModel;
    this.waypoints = [...this.waypointsModel.waypoints];
  }

  init() {
    render(new CurrentTrip(), siteHeaderElement, 'afterbegin');
    render(new Filters(), siteFilterElement);
    render(new Sorting(), this.boardContainer);
    render(this.waypointList, this.boardContainer);
    render(new PointContent(), this.waypointList.element);
    render(new NewPoint(), this.waypointList.element);

    for (let i = 1; i < this.waypoints.length; i++) {
      render(new Waypoint({ waypoint: this.waypoints[i] }), this.waypointList.element);
    }
  }
}
