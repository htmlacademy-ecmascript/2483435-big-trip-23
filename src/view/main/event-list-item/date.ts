import View from '../../_abstract';
import dayjs from 'dayjs';
import type { Waypoint } from '../../../types/way-point';

function getTemplate(event: Waypoint) {
  const { dateFrom } = event;

  const date = dayjs(dateFrom).format('MMM DD');

  return `<time class="event__date" datetime="${dateFrom}">${date}</time>`;
}

export default class Date extends View<HTMLTimeElement> {
  constructor(private event: Waypoint) {
    super();
  }

  get template() {
    return getTemplate(this.event);
  }
}
