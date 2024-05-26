/* eslint-disable camelcase */
import flatpickr from 'flatpickr';
import type { View } from '../point-form';

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
    if (new Date(userDate) > new Date(view._state.dateTo)) {
      view._state.dateTo = userDate.toString();
    }
    view.updateElement({
      dateFrom: userDate.toString(),
    });
  }
}

export function setEventFinish(view: View) {
  const currentStartDate = view._state.dateFrom === '' ? 'today' : new Date(view._state.dateFrom);

  const finishTime = flatpickr(view.element.querySelectorAll('.event__input--time')[1], {
    minDate: currentStartDate,
    static: false,
    enableTime: true,
    time_24hr: true,
    dateFormat: 'j\\/m\\/y H\\:i',
    onChange: finishDateChangeHandler,
  });

  function finishDateChangeHandler([userDate]: Date[]) {
    finishTime.destroy();
    view.updateElement({
      dateTo: userDate.toString(),
    });
  }
}
