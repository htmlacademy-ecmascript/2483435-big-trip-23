import type MockService from '../service/mock';
import type { Destination } from '../types/destination-type';
import type { Waypoint } from '../types/waypoint-type';

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

  get allDestinationsNames(): string[] {
    this.#destinations = this.#service.destinations;
    return Array.from(this.#destinations.map((waypoint) => waypoint.name));
  }

  getDestinationByID = (destination: Waypoint['destination']) => this.#destinations.find((item) => item.id === destination);
  getDestinationByName = (name: Destination['name']) => this.#destinations.find((item) => item.name === name);
}
