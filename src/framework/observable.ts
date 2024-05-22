/* eslint-disable @typescript-eslint/no-explicit-any */

export default class Observable {
  #observers = new Set();

  addObserver(observer: any) {
    this.#observers.add(observer);
  }

  removeObserver(observer: any) {
    this.#observers.delete(observer);
  }

  _notify(event: any, payload: any) {
    this.#observers.forEach((observer: any) => observer(event, payload));
  }
}
