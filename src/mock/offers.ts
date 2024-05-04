import { POINTS_TYPES } from '../const';
import { InnerOffer, Offer } from '../types/offer';
import Randomizer from '../utils/random';

const OFFERS = ['Add breakfast', 'Book tickets', 'Lunch in city', 'Add luggage', 'Switch to comfort', 'Order Uber', 'Rent a car'];

const mockItem = (): InnerOffer => ({
  id: crypto.randomUUID(),
  title: Randomizer.getArrayElement(OFFERS),
  price: Randomizer.getInteger(20, 400),
});

const mockOffer = (type: Offer['type']): Offer => ({
  type,
  offers: Array.from({ length: Randomizer.getInteger(0, 5) }, mockItem),
});

export const mockOffers = () => POINTS_TYPES.map(mockOffer);
