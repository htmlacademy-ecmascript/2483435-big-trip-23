import { getRandomWaypoint } from '../mock/waypoint.js';

const WAYPOINT_COUNT = 3;

export default class WaypointsModel {
  waypoints = Array.from({length: WAYPOINT_COUNT}, getRandomWaypoint);
  getWaypoints() {
    return this.waypoints;
  }
}
