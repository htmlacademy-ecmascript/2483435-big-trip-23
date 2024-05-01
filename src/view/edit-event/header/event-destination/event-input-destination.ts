
import { WayPoint } from '../../../../types/way-point';
import View from '../../../_abstract';
import { capitalLetter } from '../../../../utils/utils';

function getTemplate(event:WayPoint) {

  const {destination} = event;
  const name = 'name' in destination ? (destination.name as string) : '';
  const correctName = capitalLetter(name);

  return `<input class="event__input  event__input--destination" id="event-destination-1"
  type="text" name="event-destination" value="${correctName}" list="destination-list-1"></div>`;
}

export default class EventInputDestination extends View<HTMLLabelElement> {
  event:WayPoint;
  constructor(event:WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return getTemplate(this.event);
  }
}
