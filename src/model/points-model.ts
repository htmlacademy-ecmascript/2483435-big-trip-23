/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateType } from '../const';
import Observable from '../framework/observable';
import type { Point } from '../types/point-type';

export default class PointsModel extends Observable<UpdateType, Point> {
  #pointsApiService: any | null = null;
  #points: Point[] = [];

<<<<<<< HEAD
  constructor({ pointsApiService }: { pointsApiService: any }) {
=======
  constructor({pointsApiService} : {pointsApiService: any}) {
>>>>>>> c9474dda971c01a8ad03f280d38340691b379e7c
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
<<<<<<< HEAD
    } catch (err) {
=======
    } catch(err) {
>>>>>>> c9474dda971c01a8ad03f280d38340691b379e7c
      this.#points = [];
    }

    this._notify(UpdateType.INIT, {});
  }

  updatePoint(updateType: UpdateType, updatePoint: Point) {
    const index = this.#points.findIndex((point) => point.id === updatePoint.id);

    this.#points = [...this.#points.slice(0, index), updatePoint, ...this.#points.slice(index + 1)];

    this._notify(updateType, updatePoint);
  }

  addPoint(updateType: UpdateType, updatePoint: Point) {
    this.#points = [updatePoint, ...this.#points];

    this._notify(updateType, updatePoint);
  }

  deletePoint(updateType: UpdateType, updatePoint: Point) {
    const index = this.#points.findIndex((point) => point.id === updatePoint.id);

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType, updatePoint);
  }

  getById(id: string) {
    return this.#points.find((point) => point.id === id);
  }

  #adaptToClient(point: any) {
<<<<<<< HEAD
    const adaptedPoint = {
      ...point,
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
=======
    const adaptedPoint = {...point,
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite']
>>>>>>> c9474dda971c01a8ad03f280d38340691b379e7c
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
<<<<<<< HEAD
=======

>>>>>>> c9474dda971c01a8ad03f280d38340691b379e7c
}
