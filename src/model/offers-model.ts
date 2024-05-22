import Observable from '../framework/observable';
import type MockService from '../service/mock';
import type { Offer } from '../types/offer-type';
import type { Waypoint } from '../types/waypoint-type';

export default class OffersModel extends Observable {
  #service: MockService;
  #offers: Offer[];

  constructor(service: MockService) {
    super();
    this.#service = service;
    this.#offers = this.#service.offers;
  }

  get offers() {
    return this.#offers;
  }

  getAvailableOffers(type: Waypoint['type']) {
    return this.#offers.find((item) => item.type === type)!.offers;
  }

  getAvailableOffersIDs(type: Waypoint['type']): string[] {
    return this.#offers.find((item) => item.type === type)!.offers.map((item) => item.id);
  }

  getSelectedOffers(waypoint: Waypoint) {
    return this.getAvailableOffers(waypoint.type)?.filter((item) => waypoint.offers.includes(item.id));
  }
}
