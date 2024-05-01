import View from '../../_abstract';
import dayjs from 'dayjs';
import { WayPoint } from '../../../types/way-point';

function TEMPLATE(event:WayPoint) {

  const { dateFrom } = event;

  const date = dayjs(dateFrom).format('MMM DD');

  return `<time class="event__date" datetime="${dateFrom}">${date}</time>`;
}

export default class EventDate extends View<HTMLTimeElement> {
  constructor(private event: WayPoint) {
    super();
  }

  get template() {
    return TEMPLATE(this.event);
  }
}
