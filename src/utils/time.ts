import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import type { Waypoint } from '../types/waypoint-type';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const enum TimeDiff {
  DAY = 60 * 60 * 24 * 1000,
}

export type DayJsParam = string | number | Dayjs | Date | null | undefined;

function getDuration(date1: Waypoint['dateFrom'], date2: Waypoint['dateTo']): string {
  const diff = Math.abs(dayjs(date2).diff(date1));

  const daysValue = Math.floor(diff / TimeDiff.DAY);
  const durationValue = dayjs.duration(diff);

  const time = durationValue.format('DD HH mm').split(' ');

  if (dayjs.duration(diff).get('day') !== daysValue) {
    time[0] = `${daysValue}D`;
  }
  const days = time[0];
  const hours = time[1];
  const minutes = time[2];

  let correctTime = `${minutes} M`;

  if (hours !== '00' || days !== '00') {
    correctTime = `${hours}H ${minutes}M`;
  }

  if (days !== '00') {
    correctTime = `${days}D ${hours}H ${minutes}M`;
  }

  return correctTime;
}

const now = dayjs();
const isFutureWaypoints = (waypoint: Waypoint) => dayjs(waypoint.dateFrom).isAfter(now);

const isPresentWaypoints = (waypoint: Waypoint) => dayjs(waypoint.dateFrom).isBefore(now) && dayjs(waypoint.dateTo).isAfter(now);

const isPastWaypoints = (waypoint: Waypoint) => dayjs(waypoint.dateTo).isBefore(now);

const appDay = dayjs;

export { appDay, getDuration, isFutureWaypoints, isPresentWaypoints, isPastWaypoints };
