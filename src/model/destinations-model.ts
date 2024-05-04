import MockService from '../service/mock';
import { Destination } from '../types/destination';

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
}
