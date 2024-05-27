/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateType } from '../const';
import Observable from '../framework/observable';
import type { Point } from '../types/point-type';

export default class PointsModel extends Observable<UpdateType, Point> {
  #pointsApiService: any | null = null;
  #points: Point[] = [];

  constructor({ pointsApiService }: { pointsApiService: any }) {
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
    } catch (err) {
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
