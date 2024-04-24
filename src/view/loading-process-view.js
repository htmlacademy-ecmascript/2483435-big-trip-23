import { createElement } from '../render.js';

function createFilterTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export class LoadingProcessView {
  getTemplate() {
    return createFilterTemplate();
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
