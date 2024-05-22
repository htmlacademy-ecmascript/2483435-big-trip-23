import Randomizer from '../utils/random';
import { appDay } from '../utils/time';

function getDates() {
  const startDate = appDay()
    .subtract(Randomizer.getInteger(0, 10), 'day')
    .subtract(Randomizer.getInteger(0, 23), 'hour')
    .subtract(Randomizer.getInteger(0, 59), 'minute');
  const endDate = appDay()
    .add(Randomizer.getInteger(-10, 10), 'day')
    .add(Randomizer.getInteger(0, 23), 'hour')
    .add(Randomizer.getInteger(0, 59), 'minute');

  const dateFrom = String(startDate);
  const dateTo = String(endDate);

  return {
    dateFrom,
    dateTo,
  };
}

export { getDates };
