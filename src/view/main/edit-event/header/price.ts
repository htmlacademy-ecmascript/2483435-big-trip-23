import type { Waypoint } from '../../../../types/way-point';
import View from '../../../_abstract';

function getTemplate(waypoint: Waypoint) {
  const { basePrice } = waypoint;

  return `<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    &euro;
  </label>
  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
  </div>`;
}

export default class EventPrice extends View<Element> {
  #event: Waypoint;
  constructor(event: Waypoint) {
    super();
    this.#event = event;
  }

  get template() {
    return getTemplate(this.#event);
  }
}
