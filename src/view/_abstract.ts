import { createElement } from '../render';

export default abstract class View<E extends Element = HTMLDivElement>{
  #element: E | null = null;

  abstract get template(): string;

  get element() {
    this.#element ??= createElement<E>(this.template);

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
