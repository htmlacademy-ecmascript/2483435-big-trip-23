import View from '../../../../_abstract';
import { capitalLetter } from '../../../../../utils/utils';
import { Destination } from '../../../../../types/destination';

function getTemplate(destination: Destination) {
  const {name} = destination;

  const correctName = capitalLetter(name);

  return `<input class="event__input  event__input--destination" id="event-destination-1"
  type="text" name="event-destination" value="${correctName}" list="destination-list-1"></div>`;
}

export default class EventInputDestination extends View<HTMLLabelElement> {
  destination: Destination;
  constructor(destination: Destination) {
    super();
    this.destination = destination;
  }

  get template() {
    return getTemplate(this.destination);
  }
}
