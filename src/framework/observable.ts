/* eslint-disable @typescript-eslint/no-explicit-any */
type Observer<E = string, P = any> = (event: E, payload: P) => void;

export default class Observable<E = string, P = any> {
  #observers = new Set<Observer<E, P>>();

  addObserver(observer: Observer<E, P>) {
    this.#observers.add(observer);

    return () => this.removeObserver(observer);
  }

  removeObserver(observer: Observer<E, P>) {
    this.#observers.delete(observer);
  }

  _notify(event: E, payload: P) {
    this.#observers.forEach((observer) => observer(event, payload));
  }
}
