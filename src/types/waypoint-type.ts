import type { POINTS_TYPES } from '../const';
import type { CamelizeObject } from '../utils/types-utils';
import type { Destination } from './destination-type';
import type { InnerOffer } from './offer-type';

type WaypointType = (typeof POINTS_TYPES)[number];

interface ServerWayPoint {
  id: string;
  base_price: number;
  date_from: string;
  date_to: string;
  destination: Destination['id'];
  is_favorite: boolean;
  offers: InnerOffer['id'][];
  type: WaypointType;
}
type Waypoint = CamelizeObject<ServerWayPoint>;

export type { Waypoint, WaypointType };
