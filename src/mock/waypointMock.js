import { getRandomArrayElement, getRandomInteger } from '../utils.ts';

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
// const PRICE = ['€ 20', '€ 30', '€ 40', '€ 50', '€ 180'];

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

const offersList = [
  { name: 'Add breakfast', price: '30' },
  { name: 'Book tickets', price: '40' },
  { name: 'Lunch in city', price: '50' },
  { name: 'Add luggage', price: '60' },
  { name: 'Switch to comfort', price: '70' },
  { name: 'Order Uber', price: '80' },
  { name: 'Rent a car', price: '90' },
];

const IS_FAVORITE = [true, false];

const EventDate = {
  DATE: '2024-04-26',
  START: '2019-03-18T12:00',
  END: '2019-03-20T14:30',
};

const createOffer = () => {
  const currentOffer = getRandomArrayElement(offersList);
  return {
    type: getRandomArrayElement(WAYPOINT_TYPE),
    name: currentOffer.name,
    offersPrice: currentOffer.price,
  };
};

const waypoint = {
  destination: () => getRandomArrayElement(DESTINATION),
  price: () => RANDOM_100(),
  description: () => getRandomArrayElement(DESCRIPTION),
  photo: () => `https://loremflickr.com/248/152?random=${RANDOM_100()}`,
};


const createWaypoint = function () {
  const offer = createOffer();

  return {
    eventDate: EventDate.DATE,
    type: offer.type,
    destination: waypoint.destination(),
    timeStart: EventDate.START,
    timeEnd: EventDate.END,
    price: waypoint.price(),
    offers: offer.name,
    offersPrice: offer.price,
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
