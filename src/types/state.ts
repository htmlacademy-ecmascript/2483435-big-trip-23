import type { Prettify } from '../utils/types-utils';
import type { Point } from './point-type';

type State = Prettify<
  Point & {
    selectedOffers: Set<string>;
  }
>;

export { State };
