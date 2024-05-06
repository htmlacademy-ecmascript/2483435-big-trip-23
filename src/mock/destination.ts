import type { AppPicture, Destination } from '../types/destination';
import { Randomizer } from '../utils/random';
import { MOCK_CITIES, MOCK_DESCRIPTION } from './const';

const generateMockDescription = () =>
  Array.from({ length: Randomizer.getInteger(0, 5) }, () => Randomizer.getArrayElement(MOCK_DESCRIPTION)).join(' ');

const generateMockPicture = (city: string): AppPicture => ({
  src: `https://loremflickr.com/248/152?${city}=${Randomizer.getInteger()}`,
  description: generateMockDescription(),
});

const mockDestination = (name: string): Destination => ({
  id: crypto.randomUUID(),
  description: generateMockDescription(),
  name,
  pictures: Array.from({ length: Randomizer.getInteger(0, 10) }, () => generateMockPicture(name)),
});

export const mockDestinations = () => MOCK_CITIES.map(mockDestination);
