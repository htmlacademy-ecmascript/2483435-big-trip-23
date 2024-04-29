import { getRandomWaypoint } from '../mock/waypointMock.js';

const WAYPOINT_COUNT = 5;

export default class WaypointsModel {
  #waypoints = Array.from({length: WAYPOINT_COUNT}, getRandomWaypoint);
  get waypoints() {
    return this.#waypoints;
  }
}
