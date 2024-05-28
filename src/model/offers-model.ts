import { UpdateType } from '../const';
import Observable from '../framework/observable';
import type PointsApiService from '../service/point-api-service';
import type { Offer } from '../types/offer-type';
import type { Point } from '../types/point-type';

export default class OffersModel extends Observable<UpdateType, Point> {
  #pointsApiService: PointsApiService;
  #offers: Offer[] = [];

  constructor({ pointsApiService }: { pointsApiService: PointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;
    } catch (err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT, {});
  }

  getAvailableOffers(type: Point['type']) {
    return this.#offers.find((item) => item.type === type)?.offers ?? [];
  }

  getAvailableOffersIDs(type: Point['type']): string[] {
    return this.getAvailableOffers(type).map((item) => item.id) ?? [];
  }

  getSelectedOffers(point: Point) {
    return this.getAvailableOffers(point.type).filter((item) => point.offers.includes(item.id));
  }
}
