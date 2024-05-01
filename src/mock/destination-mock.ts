import type { AppPicture, Destination } from '../types/destination';
import { Randomizer } from '../utils/random';
import { MOCK_CITIES, MOCK_DESCRIPTION } from './const-mock';

const generateMockDescription = () =>
  Array.from({ length: Randomizer.getInteger(0, 5) }, () => Randomizer.getArrayElement(MOCK_DESCRIPTION)).join(' ');

const generateMockPicture = (name: string): AppPicture => ({
  src: `https://loremflickr.com/248/152?${name}=${Randomizer.getInteger()}`,
  description: generateMockDescription(),
});

const generateMockWaypoint = (name: string): Destination => ({
  id: `${Randomizer.getInteger()}`,
  description: generateMockDescription(),
  name: Randomizer.getArrayElement(MOCK_CITIES),
  pictures: Array.from({ length: Randomizer.getInteger(2, 5) }, () => generateMockPicture(name)),
});

export const generateMockWaypoints = () => MOCK_CITIES.map(generateMockWaypoint);
