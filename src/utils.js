import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:MM';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function formatEventDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}
function formatEventTime(eventTime) {
  return eventTime ? dayjs(eventTime).format(TIME_FORMAT) : '';
}

function durationEvent(start, end) {
  return dayjs(end).diff(dayjs(start), 'hours');
}

export {
  getRandomArrayElement,
  getRandomInteger,
  formatEventDate,
  formatEventTime,
  durationEvent,
};
