import type MockService from '../service/mock';
import type { Destination } from '../types/destination';

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

  get allWaypointsNames() {
    this.#destinations = this.#service.destinations;
    return Array.from(this.#destinations.map((waypoint) => waypoint.name));
  }

  getById(findId: string) {
    return this.#destinations.find((destination) => destination.id === findId);
  }
}
