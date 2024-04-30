import { generateMockWaypoint } from '../mock/way-point-mock';


export default class EditWaypointModel {
  #waypoint = generateMockWaypoint();
  get editWaypoint() {
    return this.#waypoint;
  }
}
