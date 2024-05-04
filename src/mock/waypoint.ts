import type { WayPoint } from '../types/way-point';
import { Randomizer } from '../utils/random';
import { getDates } from './utils';

export const mockWaypoint = (readyProps: Pick<WayPoint, 'destination' | 'offers' | 'type'>): WayPoint => ({
  id: crypto.randomUUID(),
  ...readyProps,
  ...getDates(),
  basePrice: Randomizer.getInteger(100, 5_000),
  isFavorite: Randomizer.boolean,
});
