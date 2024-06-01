import InfoView from '../view/header/info';
import type { Models } from '../model/create-models';
import type DestinationsModel from '../model/destinations-model';
import type { Point } from '../types/point-type';
import { remove, render } from '../framework/render';
import type PointsModel from '../model/points-model';

export default class InfoPresenter {
  #container: HTMLElement;
  #models: Models;
  #pointsModel: PointsModel;
  #destinationsModel: DestinationsModel;
  #points: Point[] = [];
  #info: InfoView | null = null;

  constructor({ container, models }: { container: HTMLElement; models: Models }) {
    this.#container = container;
    this.#models = models;
    this.#pointsModel = this.#models.pointsModel;
    this.#destinationsModel = this.#models.destinationsModel;
  }

  init() {
    Promise.all([this.#pointsModel.init(), this.#destinationsModel.init()]).finally(this.#renderInfo);
  }

  #renderInfo = () => {
    this.#pointsModel.addObserver(this.#renderInfo);
    this.#points = this.#models.pointsModel.points;

    if (this.#points.length > 0) {
      if (this.#info) {
        remove(this.#info);
      }
      this.#info = new InfoView({ points: this.#points, models: this.#models });
      render(this.#info, this.#container, 'afterbegin');
    } else {
      remove(this.#info);
    }
  };
}
