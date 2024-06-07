import './abstract-view.css';
import AbstractView from './abstract-view';

export const enum SnakeAnimation {
  CLASS_NAME = 'shake',
  ANIMATION_TIMEOUT = 600,
}

export default abstract class ShakeView<El extends Element = HTMLDivElement> extends AbstractView<El> {
  constructor() {
    super();
  }
}
