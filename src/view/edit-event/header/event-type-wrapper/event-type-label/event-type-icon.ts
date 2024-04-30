import { WayPoint } from '../../../../../types/way-point';
import View from '../../../../_abstract';

function TEMPLATE(event:WayPoint) {

  const {type} = event;

  return `<img class="event__type-icon" width="17" height="17"
  src="img/icons/${type}.png" alt="Event type icon">`;
}

export default class EventTypeIcon extends View<HTMLImageElement> {
  event:WayPoint;
  constructor(event:WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return TEMPLATE(this.event);
  }
}
