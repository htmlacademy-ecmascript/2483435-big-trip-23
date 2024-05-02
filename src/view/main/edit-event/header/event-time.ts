import { WayPoint } from '../../../../types/way-point';
import View from '../../../_abstract';
import dayjs from 'dayjs';

function getTemplate(waypoint: WayPoint) {
  const { dateFrom, dateTo } = waypoint;

  const timeStart = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const timeEnd = dayjs(dateTo).format('DD/MM/YY HH:mm');

  return `<div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time-1">${dateFrom}</label>
  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart}">
  &mdash;
  <label class="visually-hidden" for="event-end-time-1">${dateTo}</label>
  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd}">
  </div>`;
}

export default class EventTime extends View<Element> {
  event: WayPoint;
  constructor(event: WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return getTemplate(this.event);
  }
}
