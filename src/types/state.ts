import type { DataBase } from '../presenter/main-presenter';
import type { Destination } from './destination-type';
import type { InnerOffer } from './offer-type';
import type { WaypointType } from './waypoint-type';

interface State {

  id: string;
  basePrice: number;
  dateFrom: string;
  dateTo: string;
  destination: Destination['id'];
  isFavorite: boolean;
  offers: InnerOffer['id'][];
  type: WaypointType;
  dataBase: DataBase;
  availableOffers: InnerOffer[],
  selectedOffers: InnerOffer[]
}

export { State };
