import type { WayPoint } from '../../../types/way-point';
import View from '../../_abstract';
import { capitalLetter } from '../../../utils/utils';

function getTemplate(event: WayPoint) {
  const { type, destination } = event;

  const name = 'name' in destination ? destination.name : '';

  const correctType = capitalLetter(type);

  return `<h3 class="event__title">${correctType} ${name}</h3>`;
}

export default class EventTitle extends View<HTMLHeadingElement> {
  event: WayPoint;
  constructor(event: WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return getTemplate(this.event);
  }
}
