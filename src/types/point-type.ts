import type { POINTS_TYPES } from '../const';
import type { CamelizeObject } from '../utils/types-utils';
import type { Destination } from './destination-type';
import type { InnerOffer } from './offer-type';

type PointType = (typeof POINTS_TYPES)[number];

interface ServerPoint {
  id: string;
  base_price: number;
  date_from: string;
  date_to: string;
  destination: Destination['id'];
  is_favorite: boolean;
  offers: InnerOffer['id'][];
  type: PointType;
}
type Point = CamelizeObject<ServerPoint>;

export type { Point, PointType, ServerPoint };
