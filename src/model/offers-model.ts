import MockService from '../service/mock';
import { Offer } from '../types/offer';

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

  getById(offersId: string) {
    return this.#offers.find((offers) => waypoint.id === offersId);
  }

}
