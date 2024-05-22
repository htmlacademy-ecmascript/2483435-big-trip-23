import { DEFAULT_WAYPOINT } from '../mock/const';

export default class NewWaypointModel {
  #waypoint = DEFAULT_WAYPOINT;
  get newWaypoint() {
    return this.#waypoint;
  }
}
