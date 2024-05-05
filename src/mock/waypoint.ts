import type { Waypoint } from '../types/way-point';
import { Randomizer } from '../utils/random';
import { getDates } from './utils';

export const mockWaypoint = (readyProps: Pick<Waypoint, 'destination' | 'offers' | 'type'>): Waypoint => ({
  id: crypto.randomUUID(),
  ...readyProps,
  ...getDates(),
  basePrice: Randomizer.getInteger(100, 5_000),
  isFavorite: Randomizer.boolean,
});
