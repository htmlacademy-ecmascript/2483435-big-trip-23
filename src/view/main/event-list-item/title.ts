/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Waypoint } from '../../../types/way-point';
import View from '../../_abstract';
import { capitalLetter } from '../../../utils/utils';
import type { Destination } from '../../../types/destination';

function getTemplate(event: Waypoint, destination: Destination) {
  const { type } = event;
  const { name } = destination;

  const currentName = 'name' in destination ? name : '';

  const correctType = capitalLetter(type);

  return `<h3 class="event__title">${correctType} ${currentName}</h3>`;
}

export default class Title extends View<HTMLHeadingElement> {
  event: Waypoint;
  destination: Destination;
  constructor(event: Waypoint, destination: Destination) {
    super();
    this.event = event;
    this.destination = destination;
  }

  get template() {
    return getTemplate(this.event, this.destination);
  }
}
