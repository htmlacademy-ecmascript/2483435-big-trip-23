import type { POINTS_TYPES } from '../const';
import { CamelizeObject, WithDate } from '../utils/types-utils';

type WayPointType = (typeof POINTS_TYPES)[number];

interface ServerWayPoint {
  id: string;
  base_price: number;
  date_from: string;
  date_to: string;
  destination: object[];
  is_favorite: boolean;
  offers: object[];
  type: WayPointType;
}
type WayPoint = WithDate<CamelizeObject<ServerWayPoint>>;

export type { WayPoint, WayPointType };
