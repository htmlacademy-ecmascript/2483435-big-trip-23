import type { EmptyFn } from '../../types/common';
import './abstract-view.css';
import AbstractView from './view';

const enum SnakeAnimation {
  CLASS_NAME = 'shake',
  ANIMATION_TIMEOUT = 600,
}

export default abstract class ShakeView<El extends Element = HTMLDivElement> extends AbstractView<El> {
  constructor() {
    super();
  }

  shake(callback?: EmptyFn) {
    this.element.classList.add(SnakeAnimation.CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SnakeAnimation.CLASS_NAME);
      callback?.();
    }, SnakeAnimation.ANIMATION_TIMEOUT);
  }
}
