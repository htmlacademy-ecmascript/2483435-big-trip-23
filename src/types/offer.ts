import { WayPoint } from './way-point';

interface InnerOffer {
  id: string;
  title: string;
  price: number;
}

interface Offer {
  type: WayPoint;
  offers: InnerOffer[];
}

export type { InnerOffer, Offer };
