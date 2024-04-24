import { createElement } from '../render.js';

function createFilterTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export class EmptyTripListView {
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
