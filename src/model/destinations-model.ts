/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateType } from '../const';
import Observable from '../framework/observable';
import type { Destination } from '../types/destination-type';
import type { Point } from '../types/point-type';

export default class DestinationsModel extends Observable<UpdateType, Point> {
  #pointsApiService: any | null = null;
  #destinations: Destination[] = [];

  constructor({pointsApiService} : {pointsApiService: any}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT, {});
  }

  get allDestinationsNames(): string[] {
    return Array.from(this.#destinations.map((point) => point.name));
  }

  get allDestinationsIDs(): string[] {
    return Array.from(this.#destinations.map((point) => point.id));
  }

  getDestinationByID = (destination: Point['destination']) => this.#destinations.find((item) => item.id === destination);
  getDestinationByName = (name: Destination['name']) => this.#destinations.find((item) => item.name === name);
}
