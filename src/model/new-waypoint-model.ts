import { DEFAULT_DESTINATION } from '../mock/const-mock';

export default class NewWaypointModel {

  #waypoint = DEFAULT_DESTINATION;
  get newWaypoint() {
    return this.#waypoint;
  }
}

