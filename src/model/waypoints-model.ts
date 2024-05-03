import MockService from '../service/mock';
import { WayPoint } from '../types/way-point';

export default class WaypointsModel {
  #service: MockService;
  #waypoints: WayPoint[] = [];

  constructor(service: MockService) {
    this.#service = service;
    this.#waypoints = this.#service.points;
  }

  get waypoints() {
    return this.#waypoints;
  }
}
