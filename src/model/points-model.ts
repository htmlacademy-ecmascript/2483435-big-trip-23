import type { UpdateType } from '../const';
import Observable from '../framework/observable';
import type MockService from '../service/mock';
import type { Point } from '../types/point-type';

export default class PointsModel extends Observable<UpdateType, Point> {
  #service: MockService;
  #points: Point[] = [];

  constructor(service: MockService) {
    super();
    this.#service = service;
    this.#points = this.#service.points;
  }

  get points() {
    return this.#points;
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
}
