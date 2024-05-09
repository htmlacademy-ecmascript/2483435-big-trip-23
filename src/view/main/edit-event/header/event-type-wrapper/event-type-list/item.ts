import type { Waypoint } from '../../../../../../types/way-point';
import View from '../../../../../../framework/view/_abstract';
import { POINTS_TYPES } from '../../../../../../const';
import { capitalLetter, checkMatch } from '../../../../../../utils/utils';

const template = (type: string, currentType: string) => {
  const correctType = capitalLetter(currentType);

  const isChecked = () => checkMatch(type, currentType, 'checked');

  return `<div class="event__type-item">
  <input id="event-type-${currentType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isChecked()}>
  <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${correctType}</label>
</div>`;
};

const waypointTypes = (type: string) => POINTS_TYPES.reduce((accumulator, currentValue) => accumulator + template(type, currentValue), '');
function getTemplate(event: Waypoint) {
  const { type } = event;
  return `<div>${waypointTypes(type)}</div>`;
}

export default class TypeItem extends View<Element> {
  #event: Waypoint;
  constructor(event: Waypoint) {
    super();
    this.#event = event;
  }

  get template() {
    return getTemplate(this.#event);
  }
}
