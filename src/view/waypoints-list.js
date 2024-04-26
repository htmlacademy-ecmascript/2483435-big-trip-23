import { createElement } from '../render.js';

function createWaypointsListTemplate() {
  return '<ul class="trip-events__list"> </ul>';
}

export default class WaypointsList {
  getTemplate() {
    return createWaypointsListTemplate();
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
