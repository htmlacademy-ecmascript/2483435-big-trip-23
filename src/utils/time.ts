/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const enum TimeDiff {
  Day = 60 * 60 * 24 * 1000,
}

const correctDuration = (time: any) => {
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
};

const findDuration = (date1: any, date2: any) => {
  const diff = Math.abs(dayjs(date2).diff(date1));

  const daysValue = Math.floor(diff / TimeDiff.Day);
  const durationValue = dayjs.duration(diff);

  const time = durationValue.format('DD HH mm').split(' ');

  if (dayjs.duration(diff).get('day') !== daysValue) {
    time[0] = `${daysValue}D`;
  }

  return time;
};

const getDuration = (date1: any, date2: any) => {
  const currentDuration = findDuration(date1, date2);
  return correctDuration(currentDuration);
};

const isFutureWaypoints = (dateFrom: Dayjs) => dayjs(dateFrom).isAfter(dayjs());

const isPresentWaypoints = (dateFrom: Dayjs, dateTo: Dayjs) => dayjs(dateFrom).isBefore(dayjs()) && dayjs(dateTo).isAfter(dayjs());

const isPastWaypoints = (dateTo: Dayjs) => dayjs(dateTo).isBefore(dayjs());

const appDay = dayjs;

export { appDay, getDuration, isFutureWaypoints, isPresentWaypoints, isPastWaypoints, findDuration };
