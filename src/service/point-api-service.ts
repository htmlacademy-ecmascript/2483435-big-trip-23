/* eslint-disable camelcase */
import ApiService from '../framework/api-service';
import type { Destination } from '../types/destination-type';
import type { Offer } from '../types/offer-type';
import type { Point, ServerPoint } from '../types/point-type';
export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse<ServerPoint[]>);
  }

  get destinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse<Destination[]>);
  }

  get offers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse<Offer[]>);
  }

  async updatePoint(point: Point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: 'PUT',
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point: Point): ServerPoint {
    const adaptedPoint: Partial<ServerPoint & Point> = {
      ...point,

      date_from: point.dateFrom,
      date_to: point.dateTo,
      base_price: point.basePrice,
      is_favorite: point.isFavorite,
    };

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;

    return adaptedPoint as ServerPoint;
  }
}
