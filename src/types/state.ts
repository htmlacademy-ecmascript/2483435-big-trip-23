import type { Prettify } from '../utils/types-utils';
import type { Waypoint } from './waypoint-type';

type State = Prettify<
  Waypoint & {
    selectedOffs: Set<string>;
  }
>;

export { State };
