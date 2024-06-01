/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import ApiService from '../framework/api-service';
import type { Destination } from '../types/destination-type';
import type { Offer } from '../types/offer-type';
import type { Point, ServerPoint } from '../types/point-type';
import type { State } from '../types/state';

const URL = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

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

    const parsedResponse = await ApiService.parseResponse<ServerPoint>(response);

    return parsedResponse;
  }

  async addPoint(point: Point) {
    const response = await this._load({
      url: URL.POINTS,
      method: 'POST',
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse<ServerPoint>(response);

    return parsedResponse;
  }

  async deletePoint(point: Point) {
    const response = await this._load({
      url: `${URL.POINTS}/${point.id}`,
      method: 'DELETE',
    });

    return response;
  }

  #adaptToServer(point: State) {
    const adaptedPoint = {
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

  adaptToClient(point: any) {
    const adaptedPoint = {
      ...point,
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

}
