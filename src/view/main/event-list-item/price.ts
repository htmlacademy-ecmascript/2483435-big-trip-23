import type { Waypoint } from '../../../types/way-point';
import View from '../../_abstract';

function getTemplate(event: Waypoint) {
  const { basePrice } = event;

  return `<p class="event__price">
  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
</p>`;
}

export default class Price extends View<HTMLParagraphElement> {
  #event: Waypoint;
  constructor(event: Waypoint) {
    super();
    this.#event = event;
  }

  get template() {
    return getTemplate(this.#event);
  }
}
