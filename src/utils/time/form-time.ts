/* eslint-disable camelcase */
import flatpickr from 'flatpickr';
import type { View } from '../point-form';
import { appDay } from './time';

export function setEventStart(view: View) {
  flatpickr(view.element.querySelectorAll('.event__input--time')[0], {
    minDate: 'today',
    static: false,
    enableTime: true,
    time_24hr: true,
    dateFormat: 'j\\/m\\/y H\\:i',
    onChange: startDateChangeHandler,
  });

  function startDateChangeHandler([userDate]: Date[]) {
    const start = appDay(userDate);
    const finish = appDay(view._state.dateTo);

    if (start >= finish) {
      view._state.dateTo = start.add(5, 'minute').toString();
    }

    view.updateElement({
      dateFrom: userDate.toString(),
    });
  }
}

export function setEventFinish(view: View) {
  const currentStartDate = view._state.dateFrom === '' ? 'today' : appDay(view._state.dateFrom).toString();

  flatpickr(view.element.querySelectorAll('.event__input--time')[1], {
    minDate: currentStartDate,
    static: false,
    enableTime: true,
    time_24hr: true,
    dateFormat: 'j\\/m\\/y H\\:i',
    onChange: finishDateChangeHandler,
  });

  function finishDateChangeHandler([userDate]: Date[]) {
    const start = appDay(view._state.dateFrom);
    const finish = appDay(userDate);

    if (start >= finish) {
      view._state.dateFrom = start.subtract(5, 'minute').toString();
    }

    view.updateElement({
      dateTo: userDate.toString(),
    });
  }
}
