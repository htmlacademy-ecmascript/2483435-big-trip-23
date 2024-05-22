import { mockDestinations } from '../mock/destination';
import { mockOffers } from '../mock/offers';
import { mockWaypoint } from '../mock/waypoint';
import type { Waypoint } from '../types/waypoint-type';
import Randomizer from '../utils/random';

export default class MockService {
  #destinations = mockDestinations();
  #points: Waypoint[] = [];
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

    return mockWaypoint({ destination, offers: offersIDs, type });
  };

  #generatePoints() {
    return Array.from({ length: 1 }, this.#generatePoint);
  }
}
