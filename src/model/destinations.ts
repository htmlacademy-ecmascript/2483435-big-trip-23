import { UpdateType } from '../const';
import Observable from '../framework/observable';
import type PointsApiService from '../service/point-api-service';
import type { Destination } from '../types/destination-type';
import type { Point } from '../types/point-type';

export default class DestinationsModel extends Observable<UpdateType, Point> {
  #service: PointsApiService | null = null;
  #destinations: Destination[] = [];

  constructor({ service }: { service: PointsApiService }) {
    super();
    this.#service = service;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#service?.destinations;
      this.#destinations = destinations ?? [];
    } catch (err) {
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
