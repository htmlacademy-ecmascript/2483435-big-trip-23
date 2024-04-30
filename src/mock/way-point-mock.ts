import type { WayPoint } from '../types/way-point';
import { Randomizer } from '../utils/random';
import { MOCK_OFFERS} from './const-mock';
import {POINTS_TYPES} from '../const';
import { getDates } from '../utils/time';
import { generateMockWaypoints } from './destination-mock';

const generateOffers = () => ({
  id: `${Randomizer.getInteger()}`,
  title: `${Randomizer.getArrayElement(MOCK_OFFERS)}`,
  price: Randomizer.getInteger(20,100)
});

export const generateMockWaypoint = (): WayPoint => ({

  id: `${Randomizer.getInteger()}`,
  basePrice: Randomizer.getInteger(100, 5_000),
  dateFrom: getDates().dateFrom,
  dateTo: getDates().dateTo,
  destination: Randomizer.getArrayElement(generateMockWaypoints()),
  isFavorite: Randomizer.boolean,
  offers: Array.from({ length: Randomizer.getInteger(0,5) }, generateOffers),
  type: Randomizer.getArrayElement(POINTS_TYPES)

});

