import { createElement } from '../render';

export default abstract class AbstractView<El extends Element = HTMLDivElement> {
  #element: El | null = null;

  get element() {
    this.#element ??= createElement<El>(this.template);
    return this.#element;
  }

  abstract get template(): string;

  removeElement() {
    this.#element = null;
  }
}
