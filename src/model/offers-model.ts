import Observable from '../framework/observable';
import type MockService from '../service/mock';
import type { Offer } from '../types/offer-type';
import type { Point } from '../types/point-type';

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

  getAvailableOffers(type: Point['type']) {
    return this.#offers.find((item) => item.type === type)!.offers;
  }

  getAvailableOffersIDs(type: Point['type']): string[] {
    return this.#offers.find((item) => item.type === type)!.offers.map((item) => item.id);
  }

  getSelectedOffers(point: Point) {
    return this.getAvailableOffers(point.type)?.filter((item) => point.offers.includes(item.id));
  }
}
