import type { Waypoint } from '../../../../../types/way-point';
import View from '../../../../_abstract';

function getTemplate(event: Waypoint) {
  const { type } = event;

  return `<img class="event__type-icon" width="17" height="17"
  src="img/icons/${type}.png" alt="Event type icon">`;
}

export default class TypeIcon extends View<HTMLImageElement> {
  #event: Waypoint;
  constructor(event: Waypoint) {
    super();
    this.#event = event;
  }

  get template() {
    return getTemplate(this.#event);
  }
}
