/* eslint-disable @typescript-eslint/no-explicit-any */
import { WayPoint } from '../../../types/way-point';
import View from '../../_abstract';
import { capitalLetter } from '../../../utils/utils';

function TEMPLATE(event:any) {

  const {type, destination: {name}} = event;

  const correctType = capitalLetter(type);

  return `<h3 class="event__title">${correctType} ${name}</h3>`;
}

export default class EventTitle extends View<HTMLHeadingElement> {
  event:WayPoint;
  constructor(event:WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return TEMPLATE(this.event);
  }
}
