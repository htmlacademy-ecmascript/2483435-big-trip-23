/* eslint-disable camelcase */
import ApiService from '../framework/api-service';
import type { Destination } from '../types/destination-type';
import type { Offer } from '../types/offer-type';
import type { Point, ServerPoint } from '../types/point-type';
import { camelizeObject, snakelizeObject } from '../utils/case-changer';

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

  #adaptToServer(point: Point): ServerPoint {
    return snakelizeObject(point);
  }

  adaptToClient(point: ServerPoint) {
    return camelizeObject(point);
  }
}
