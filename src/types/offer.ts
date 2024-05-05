import type { WaypointType } from './way-point';

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
