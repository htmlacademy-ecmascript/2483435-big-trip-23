import Randomizer from '../utils/random';
import { appDay } from '../utils/time';

function getDates() {
  const dateFrom = appDay()
    .subtract(Randomizer.getInteger(0, 10), 'day')
    .add(Randomizer.getInteger(0, 10), 'day')
    .subtract(Randomizer.getInteger(0, 23), 'hour')
    .subtract(Randomizer.getInteger(0, 59), 'minute');
  const dateTo = appDay()
    .add(Randomizer.getInteger(0, 10), 'day')
    .subtract(Randomizer.getInteger(0, 6), 'day')
    .add(Randomizer.getInteger(0, 23), 'hour')
    .add(Randomizer.getInteger(0, 59), 'minute');

  return {
    dateFrom,
    dateTo,
  };
}

export { getDates };
