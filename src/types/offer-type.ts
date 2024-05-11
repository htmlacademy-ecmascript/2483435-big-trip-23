import type { WaypointType } from './waypoint-type';

interface InnerOffer {
  id: string;
  title: string;
  price: number;
}

interface Offer {
  type: WaypointType;
  offers: InnerOffer[];
}

export type { InnerOffer, Offer };
