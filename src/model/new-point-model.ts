import { DEFAULT_POINT } from '../const';

export default class NewPointModel {
  #point = DEFAULT_POINT;

  get newPoint() {
    return this.#point;
  }
}
