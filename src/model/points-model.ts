/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateType } from '../const';
import Observable from '../framework/observable';
import type PointsApiService from '../service/point-api-service';
import type { Point } from '../types/point-type';

export default class PointsModel extends Observable<UpdateType, Point> {
  #service: PointsApiService;
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
      const points = await this.#service.points;
      this.#points = points.map(this.#service.adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT, {});
  }

  async updatePoint(updateType: UpdateType, currentPoint: Point) {
    const index = this.#points.findIndex((point) => point.id === currentPoint.id);
    try {
      const response = await this.#service.updatePoint(currentPoint);

      const updatedPoint = this.#service.adaptToClient(response);
      this.#points = [...this.#points.slice(0, index), updatedPoint, ...this.#points.slice(index + 1)];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType: UpdateType, currentPoint: Point) {
    try {
      const response = await this.#service.addPoint(currentPoint);
      const newPoint = this.#service.adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType: UpdateType, currentPoint: Point) {
    const index = this.#points.findIndex((point) => point.id === currentPoint.id);

    try {
      await this.#service.deletePoint(currentPoint);
      this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

      this._notify(updateType, {});
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  getById(id: string) {
    return this.#points.find((point) => point.id === id);
  }
}
