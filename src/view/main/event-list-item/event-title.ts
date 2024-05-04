/* eslint-disable @typescript-eslint/no-unused-vars */
import type { WayPoint } from '../../../types/way-point';
import View from '../../_abstract';
import { capitalLetter } from '../../../utils/utils';
import { Destination } from '../../../types/destination';

function getTemplate(event: WayPoint, destination: Destination) {
  const { type } = event;
  const { name } = destination;

  const currentName = 'name' in destination ? name : '';

  const correctType = capitalLetter(type);

  return `<h3 class="event__title">${correctType} ${currentName}</h3>`;
}

export default class EventTitle extends View<HTMLHeadingElement> {
  event: WayPoint;
  destination: Destination;
  constructor(event: WayPoint, destination: Destination) {
    super();
    this.event = event;
    this.destination = destination;
  }

  get template() {
    return getTemplate(this.event, this.destination);
  }
}
