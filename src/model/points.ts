/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateType } from '../const';
import Observable from '../framework/observable';
import type PointsApiService from '../service/point-api-service';
import type { Point } from '../types/point-type';

export default class PointsModel extends Observable<UpdateType, Point> {
  #service: PointsApiService | null = null;
  #points: Point[] = [];

  constructor({ service }: { service: PointsApiService }) {
    super();
    this.#service = service;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#service?.points;
      this.#points = points?.map(this.#adaptToClient) ?? [];
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT, {});
  }

  async updatePoint(updateType: UpdateType, currentPoint: Point) {
    const index = this.#points.findIndex((point) => point.id === currentPoint.id);
    try {
      const response = await this.#service?.updatePoint(currentPoint);

      const updatedPoint = this.#adaptToClient(response);
      this.#points = [...this.#points.slice(0, index), updatedPoint, ...this.#points.slice(index + 1)];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType: UpdateType, currentPoint: Point) {
    try {
      const response = await this.#service?.addPoint(currentPoint);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType: UpdateType, currentPoint: Point) {
    const index = this.#points.findIndex((point) => point.id === currentPoint.id);

    try {
      await this.#service?.deletePoint(currentPoint);
      this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

      this._notify(updateType, {});
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
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
