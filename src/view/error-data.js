import { createElement } from '../render.js';

function createErrorDataTemplate() {
  return '<p class="trip-events__msg">Failed to load latest route information</p>';
}

export class ErrorData {
  getTemplate() {
    return createErrorDataTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
