/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiService from '../framework/api-service';
import type { Point } from '../types/point-type';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
<<<<<<< HEAD
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
=======
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
>>>>>>> c9474dda971c01a8ad03f280d38340691b379e7c
  }

  async updatePoint(point: Point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
<<<<<<< HEAD
      headers: new Headers({ 'Content-Type': 'application/json' }),
=======
      headers: new Headers({'Content-Type': 'application/json'}),
>>>>>>> c9474dda971c01a8ad03f280d38340691b379e7c
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point: any) {
<<<<<<< HEAD
    const adaptedPoint = {
      ...point,
=======
    const adaptedPoint = {...point,
>>>>>>> c9474dda971c01a8ad03f280d38340691b379e7c
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'base_price': point.basePrice,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
<<<<<<< HEAD
=======

>>>>>>> c9474dda971c01a8ad03f280d38340691b379e7c
}
