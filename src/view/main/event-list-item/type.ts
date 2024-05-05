import View from '../../_abstract';
import type { Waypoint } from '../../../types/way-point';

function getTemplate(event: Waypoint) {
  const { type } = event;
  return `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>`;
}

export default class Type extends View<Element> {
  event: Waypoint;
  constructor(event: Waypoint) {
    super();
    this.event = event;
  }

  get template() {
    return getTemplate(this.event);
  }
}
