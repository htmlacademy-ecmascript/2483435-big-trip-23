import type { Waypoint } from '../../../../../types/way-point';
import View from '../../../../../framework/view/_abstract';
import { capitalLetter } from '../../../../../utils/utils';

function getTemplate(event: Waypoint) {
  const { type } = event;

  const correctType = capitalLetter(type);

  return `<label class="event__label  event__type-output" for="event-destination-1">${correctType}</label>`;
}

export default class LabelDestination extends View<HTMLLabelElement> {
  #event: Waypoint;
  constructor(event: Waypoint) {
    super();
    this.#event = event;
  }

  get template() {
    return getTemplate(this.#event);
  }
}
