import type { InnerOffer } from '../../types/offer-type';

const createAvailableOffersTemplate = (offer: InnerOffer, selectedOffers: InnerOffer[]): string => {
  const selectedOffersIDs = selectedOffers.map((selectOffer) => selectOffer.id);

  const isSelected = () => (selectedOffersIDs.includes(offer.id) ? 'checked' : '');

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${isSelected()}>
  <label class="event__offer-label" for="event-offer-${offer.id}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`;
};

const createOffersTemplate = (availableOffers: InnerOffer[], selectedOffers: InnerOffer[]) =>
  availableOffers.length !== 0
    ? `
    <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${availableOffers.map((offer: InnerOffer): string => createAvailableOffersTemplate(offer, selectedOffers)).join('')}
    </div>
      </section>`
    : '';

export { createOffersTemplate };
