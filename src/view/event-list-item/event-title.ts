/* eslint-disable @typescript-eslint/no-explicit-any */
import { WayPoint } from '../../types/way-point';
import View from '../_abstract';

function TEMPLATE(event:any) {

  const {type, destination: {name}} = event;

  const currentType = type.charAt(0).toUpperCase() + type.slice(1);

  return `<h3 class="event__title">${currentType} ${name}</h3>`;
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
