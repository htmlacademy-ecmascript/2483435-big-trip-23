import type MockService from '../service/mock';
import type { Waypoint } from '../types/way-point';

export default class WaypointsModel {
  #service: MockService;
  #waypoints: Waypoint[] = [];

  constructor(service: MockService) {
    this.#service = service;
    this.#waypoints = this.#service.points;
  }

  get waypoints() {
    return this.#waypoints;
  }

  getById(id: string) {
    return this.#waypoints.find((waypoint) => waypoint.id === id);
  }
}
