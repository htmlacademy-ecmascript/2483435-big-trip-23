import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Randomizer from './random';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const appDay = dayjs;

function getDates() {
  const dateFrom = appDay()
    .subtract(Randomizer.getInteger(0, 7), 'day')
    .subtract(Randomizer.getInteger(0, 23), 'hour')
    .subtract(Randomizer.getInteger(0, 59), 'minute');
  const dateTo = appDay()
    .add(Randomizer.getInteger(0, 7), 'day')
    .add(Randomizer.getInteger(0, 23), 'hour')
    .add(Randomizer.getInteger(0, 59), 'minute');

  return {
    dateFrom,
    dateTo,
  };
}

export { getDates };
