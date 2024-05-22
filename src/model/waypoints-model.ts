import type { UpdateType } from '../const';
import Observable from '../framework/observable';
import type MockService from '../service/mock';
import type { Waypoint } from '../types/waypoint-type';

export default class WaypointsModel extends Observable<UpdateType, Waypoint> {
  #service: MockService;
  #waypoints: Waypoint[] = [];

  constructor(service: MockService) {
    super();
    this.#service = service;
    this.#waypoints = this.#service.points;
  }

  get waypoints() {
    return this.#waypoints;
  }

  updateWaypoint(updateType: UpdateType, updateWaypoint: Waypoint) {
    const index = this.#waypoints.findIndex((waypoint) => waypoint.id === updateWaypoint.id);

    this.#waypoints = [...this.#waypoints.slice(0, index), updateWaypoint, ...this.#waypoints.slice(index + 1)];

    this._notify(updateType, updateWaypoint);
  }

  addWaypoint(updateType: UpdateType, updateWaypoint: Waypoint) {
    this.#waypoints = [updateWaypoint, ...this.#waypoints];

    this._notify(updateType, updateWaypoint);
  }

  deleteWaypoint(updateType: UpdateType, updateWaypoint: Waypoint) {
    const index = this.#waypoints.findIndex((waypoint) => waypoint.id === updateWaypoint.id);

    this.#waypoints = [...this.#waypoints.slice(0, index), ...this.#waypoints.slice(index + 1)];

    this._notify(updateType, updateWaypoint);
  }

  getById(id: string) {
    return this.#waypoints.find((waypoint) => waypoint.id === id);
  }
}
