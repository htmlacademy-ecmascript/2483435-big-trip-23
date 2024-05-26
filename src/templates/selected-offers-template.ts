import type { InnerOffer } from '../types/offer-type';

const markUpOffer = (currentOffer: InnerOffer): string => `
<li class="event__offer">
      <span class="event__offer-title">${currentOffer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${currentOffer.price}</span>
    </li>
`;

const createSelectedOffersTemplate = (selectedOffers: InnerOffer[]): string =>
  selectedOffers.map((currentOffer: InnerOffer): string => markUpOffer(currentOffer)).join('');

export { createSelectedOffersTemplate };
