/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

const TimeFormat = {
  WAYPOINT_DATE: 'MMM DD',
  WAYPOINT_TIME: 'HH:MM',
  CREATE_WAYPOINT_TIME: 'DD/MM/YY HH:MM',
};

function getRandomArrayElement(items:any) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInteger = (min:number, max:number) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function formatEventDate(eventDate:any) {
  return eventDate ? dayjs(eventDate).format(TimeFormat.WAYPOINT_DATE) : '';
}
function formatEventTime(eventTime:any) {
  return eventTime ? dayjs(eventTime).format(TimeFormat.WAYPOINT_TIME) : '';
}

function formatNewEventTime(eventTime:any) {
  return eventTime
    ? dayjs(eventTime).format(TimeFormat.CREATE_WAYPOINT_TIME)
    : '';
}

function durationEvent(start:string, end:string) {
  return dayjs(end).diff(dayjs(start), 'hours');
}

export {
  getRandomArrayElement,
  getRandomInteger,
  formatEventDate,
  formatEventTime,
  durationEvent,
  formatNewEventTime,
};
