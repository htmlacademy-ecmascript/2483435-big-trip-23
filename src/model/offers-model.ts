/* eslint-disable @typescript-eslint/no-explicit-any */
import type MockService from '../service/mock';
import type { Offer } from '../types/offer';
import type { Waypoint } from '../types/way-point';

export default class OffersModel {
  #service: MockService;
  #offers: Offer[];

  constructor(service: MockService) {
    this.#service = service;
    this.#offers = this.#service.offers;
  }

  get offers() {
    return this.#offers;
  }

  getAvailableOffers(waypoint: Waypoint) {
    return this.#offers.find((item) => item.type === waypoint.type)!.offers;
  }

  getSelectedOffers(waypoint: Waypoint) {
    return this.getAvailableOffers(waypoint)?.filter((item) => waypoint.offers.includes(item.id));
  }
}
