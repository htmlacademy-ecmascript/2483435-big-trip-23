import type { Waypoint } from '../../../types/way-point';
import View from '../../_abstract';
import dayjs from 'dayjs';

function getTemplate(waypoint: Waypoint) {
  const { dateFrom, dateTo } = waypoint;

  const timeStart = dateFrom.format('HH:mm');
  const timeEnd = dateTo.format('HH:mm');

  const duration = () => {
    const time = dayjs.duration(dateTo.diff(dateFrom)).format('HH mm').split(' ');
    const hours = time[0];
    const minutes = time[1];
    let correctTime = `${minutes} M`;
    if (hours !== '00') {
      correctTime = `${hours}H ${minutes}M`;
    }
    return correctTime;
  };

  return `<div class="event__schedule">
  <p class="event__time">
    <time class="event__start-time" datetime="${dateFrom}">${timeStart}</time>
    &mdash;
    <time class="event__end-time" datetime="${dateTo}">${timeEnd}</time>
  </p>
  <p class="event__duration">${duration()}</p>
</div>`;
}

export default class Schedule extends View<Element> {
  #event: Waypoint;
  constructor(event: Waypoint) {
    super();
    this.#event = event;
  }

  get template() {
    return getTemplate(this.#event);
  }
}
