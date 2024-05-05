import type MockService from '../service/mock';
import type { Destination } from '../types/destination';
import type { Waypoint } from '../types/way-point';

export default class DestinationsModel {
  #service: MockService;
  #destinations: Destination[];

  constructor(service: MockService) {
    this.#service = service;
    this.#destinations = this.#service.destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  get allDestinationsNames() {
    this.#destinations = this.#service.destinations;
    return Array.from(this.#destinations.map((waypoint) => waypoint.name));
  }

  getDestination(waypoint: Waypoint) {
    return this.#destinations.find((item) => item.id === waypoint.destination);
  }
}
