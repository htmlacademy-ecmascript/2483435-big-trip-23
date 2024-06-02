import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import type { Point } from '../../types/point-type';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const enum TimeDiff {
  DAY = 60 * 60 * 24 * 1000,
}

export type DayJsParam = string | number | Dayjs | Date | null | undefined;

function getDuration(date1: Point['dateFrom'], date2: Point['dateTo']): string {
  const diff = Math.abs(dayjs(date2).diff(date1));

  const daysValue = Math.floor(diff / TimeDiff.DAY);
  const durationValue = dayjs.duration(diff);

  const time = durationValue.format('DD[D] HH[H] mm[M]').split(' ');

  if (durationValue.get('day') !== daysValue) {
    time[0] = `${daysValue}D`;
  }

  return time.join(' ');
}

const appDay = dayjs;

export { appDay, getDuration };
