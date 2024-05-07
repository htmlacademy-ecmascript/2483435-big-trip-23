import './abstract-view.css';
import View from './view';

const enum SnakeAnimation {
  CLASS_NAME = 'shake',
  ANIMATION_TIMEOUT = 600,
}

export default abstract class ShakeView<El extends Element = HTMLDivElement> extends View<El> {
  constructor() {
    super();
  }

  shake(callback?: () => void) {
    this.element.classList.add(SnakeAnimation.CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SnakeAnimation.CLASS_NAME);
      callback?.();
    }, SnakeAnimation.ANIMATION_TIMEOUT);
  }
}
