import View from '../_abstract';
import { WayPoint } from '../../types/way-point';

function TEMPLATE(event: WayPoint) {
  const { type } = event;
  return `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>`;
}

export default class EventType extends View<Element> {
  event: WayPoint;
  constructor(event: WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return TEMPLATE(this.event);
  }
}
