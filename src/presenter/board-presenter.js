import { RenderPosition } from '../render.js';
import CurrentTrip from '../view/current-trip.js';
import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import WaypointsList from '../view/waypoints-list.js';
import Waypoint from '../view/waypoint.js';
import NewPoint from '../view/new-point.js';
import PointContent from '../view/point-content.js';
import { render } from '../render.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  waypointList = new WaypointsList();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new CurrentTrip(), siteHeaderElement, RenderPosition.AFTERBEGIN);
    render(new Filters(), siteFilterElement);
    render(new Sorting(), this.boardContainer);
    render(this.waypointList, this.boardContainer);
    render(new PointContent(), this.waypointList.getElement());
    render(new NewPoint(), this.waypointList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new Waypoint(), this.waypointList.getElement());
    }
  }
}
