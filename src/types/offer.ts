import { WayPointType } from './way-point';

interface InnerOffer {
  id: string;
  title: string;
  price: number;
}

interface Offer {
  type: WayPointType;
  offers: InnerOffer[];
}

export type { InnerOffer, Offer };
