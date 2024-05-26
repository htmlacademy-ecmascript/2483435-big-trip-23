import { mockDestinations } from '../mock/destination';
import { mockOffers } from '../mock/offers';
import { mockPoint } from '../mock/point';
import type { Point } from '../types/point-type';
import Randomizer from '../utils/random';

export default class MockService {
  #destinations = mockDestinations();
  #points: Point[] = [];
  #offers = mockOffers();

  constructor() {
    this.#points = this.#generatePoints();
  }

  get destinations() {
    return this.#destinations;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  #generatePoint = () => {
    const { type, offers } = Randomizer.getArrayElement(this.#offers);
    const destination = Randomizer.getArrayElement(this.#destinations).id;
    const offersIDs = offers.slice(0, Randomizer.getInteger(0, offers.length)).map(({ id }) => id);

    return mockPoint({ destination, offers: offersIDs, type });
  };

  #generatePoints() {
    return Array.from({ length: 10 }, this.#generatePoint);
  }
}
