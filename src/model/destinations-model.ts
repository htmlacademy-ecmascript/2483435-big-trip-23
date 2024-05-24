import Observable from '../framework/observable';
import type MockService from '../service/mock';
import type { Destination } from '../types/destination-type';
import type { Waypoint } from '../types/waypoint-type';

export default class DestinationsModel extends Observable {
  #service: MockService;
  #destinations: Destination[];

  constructor(service: MockService) {
    super();
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

  get allDestinationsIDs(): string[] {
    this.#destinations = this.#service.destinations;
    return Array.from(this.#destinations.map((waypoint) => waypoint.id));
  }

  getDestinationByID = (destination: Waypoint['destination']) => this.#destinations.find((item) => item.id === destination);
  getDestinationByName = (name: Destination['name']) => this.#destinations.find((item) => item.name === name);
}
