import dayjs from 'dayjs';

const MOCK_CITIES = ['Amsterdam', 'London', 'Chamonix', 'Geneva'];

const MOCK_DESCRIPTION = [
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

const DEFAULT_DESTINATION = {
  id: '1',
  basePrice: '',
  dateFrom: dayjs(),
  dateTo: dayjs().add(3, 'day').add(4, 'hours').add(15, 'minute'),
  destination: 'Geneva',
  isFavorite: false,
  offers: [
    {
      id: 3,
      title: 'Add breakfast',
      price: 70,
    },
    {
      id: 2,
      title: 'Book tickets',
      price: 90,
    },
  ],
  type: 'Flight',
};

export { MOCK_CITIES, MOCK_DESCRIPTION, DEFAULT_DESTINATION };
