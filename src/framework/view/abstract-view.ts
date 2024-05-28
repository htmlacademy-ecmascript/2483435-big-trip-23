import type { EmptyFn } from '../../types/common';
import { createElement } from '../render';

const enum SnakeAnimation {
  CLASS_NAME = 'shake',
  ANIMATION_TIMEOUT = 600,
}

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

  shake(callback?: EmptyFn) {
    this.element.classList.add(SnakeAnimation.CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SnakeAnimation.CLASS_NAME);
      callback?.();
    }, SnakeAnimation.ANIMATION_TIMEOUT);
  }
}
