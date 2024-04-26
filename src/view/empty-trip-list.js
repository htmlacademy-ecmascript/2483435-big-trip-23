import { createElement } from '../render.js';

function createEmptyTripListTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export class EmptyTripList {
  getTemplate() {
    return createEmptyTripListTemplate();
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
