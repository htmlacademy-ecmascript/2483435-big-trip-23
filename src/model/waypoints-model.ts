import { generateMockWaypoint } from '../mock/way-point-mock';

const WAYPOINT_COUNT = 5;

export default class WaypointsModel {
  #waypoints = Array.from({length: WAYPOINT_COUNT}, generateMockWaypoint);
  get waypoints() {
    return this.#waypoints;
  }
}
