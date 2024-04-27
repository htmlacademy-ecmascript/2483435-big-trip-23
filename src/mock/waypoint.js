import { getRandomArrayElement, getRandomInteger } from '../utils.js';

const RANDOM_10 = () => getRandomInteger(0, 10);
const RANDOM_100 = () => getRandomInteger(0, 100);
const WAYPOINT_TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];
const DESTINATION = ['Amsterdam', 'London', 'Chamonix', 'Geneva'];
const PRICE = ['€ 20', '€ 30', '€ 40', '€ 50', '€ 180'];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const OFFERS_LIST = [
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
  'Add luggage',
  'Switch to comfort',
  'Order Uber',
  'Rent a car',
];

const IS_FAVORITE = [true, false];

const EventDate = {
  DATE: '2024-04-26',
  START: '2019-03-18T12:00',
  END: '2019-03-20T14:30',
};

const offers = {
  type: () => getRandomArrayElement(WAYPOINT_TYPE),
  name: () => getRandomArrayElement(OFFERS_LIST),
  offersPrice: () => getRandomArrayElement(PRICE),
};

const waypoint = {
  destination: () => getRandomArrayElement(DESTINATION),
  price: () => RANDOM_100(),
  description: () => getRandomArrayElement(DESCRIPTION),
  photo: () => `https://loremflickr.com/248/152?random=${RANDOM_100()}`,
};

const createWaypoint = function () {
  return {
    eventDate: EventDate.DATE,
    type: offers.type(),
    destination: waypoint.destination(),
    timeStart: EventDate.START,
    timeEnd: EventDate.END,
    price: waypoint.price(),
    offers: offers.name(),
    offersPrice: offers.offersPrice(),
    photo: waypoint.photo(),
    isFavorite: getRandomArrayElement(IS_FAVORITE),
  };
};

const generateMockWaypoints = () =>
  Array.from({ length: RANDOM_10() }, () => createWaypoint());

function getRandomWaypoint() {
  return getRandomArrayElement(generateMockWaypoints());
}

export { getRandomWaypoint };
