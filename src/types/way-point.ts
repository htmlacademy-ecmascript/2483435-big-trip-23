import type { POINTS_TYPES } from '../const';
import { CamelizeObject, WithDate } from '../utils/types-utils';
import { Destination } from './destination';
import { InnerOffer } from './offer';

type WayPointType = (typeof POINTS_TYPES)[number];

interface ServerWayPoint {
  id: string;
  base_price: number;
  date_from: string;
  date_to: string;
  destination: Destination['id'];
  is_favorite: boolean;
  offers: InnerOffer['id'][];
  type: WayPointType;
}
type WayPoint = WithDate<CamelizeObject<ServerWayPoint>>;

export type { WayPoint, WayPointType };
