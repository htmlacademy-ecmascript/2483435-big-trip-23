/* eslint-disable @typescript-eslint/no-explicit-any */
import ShakeView from './shake-view';
export type Partial<T> = { [P in keyof T]?: T[P] | undefined; }

export default abstract class AbstractStatefulView<State extends object, El extends Element = HTMLDivElement> extends ShakeView<El> {
  _state = {} as State;

  updateElement(update: Partial<State>) {
    if (!update) {
      return;
    }

    this._setState(update);

    this.#rerenderElement();
  }

  abstract _restoreHandlers(): any;

  _setState(update: State | Partial<State>) {
    this._state = structuredClone({ ...this._state, ...update });
  }

  #rerenderElement() {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent?.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  }
}
