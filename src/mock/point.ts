import type { Point } from '../types/point-type';
import { Randomizer } from '../utils/random';
import { getDates } from './utils';

export const mockPoint = (readyProps: Pick<Point, 'destination' | 'offers' | 'type'>): Point => ({
  id: crypto.randomUUID(),
  ...readyProps,
  ...getDates(),
  basePrice: Randomizer.getInteger(100, 5_000),
  isFavorite: Randomizer.boolean,
});
