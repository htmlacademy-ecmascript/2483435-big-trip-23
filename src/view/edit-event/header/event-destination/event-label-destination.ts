import { WayPoint } from '../../../../types/way-point';
import View from '../../../_abstract';
import { capitalLetter } from '../../../../utils/utils';

function TEMPLATE(event:WayPoint) {

  const {type} = event;

  const correctType = capitalLetter(type);

  return `<label class="event__label  event__type-output" for="event-destination-1">${correctType}</label>`;
}

export default class EventLabelDestination extends View<HTMLLabelElement> {
  event:WayPoint;
  constructor(event:WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return TEMPLATE(this.event);
  }
}
