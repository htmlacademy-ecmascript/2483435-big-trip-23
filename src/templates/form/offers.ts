import type { Models } from '../../model/create-models';
import type { InnerOffer } from '../../types/offer-type';
import type { State } from '../../types/state';

const createAvailableOffersTemplate = (offer: InnerOffer, selectedOffers: Set<string>, isDisabled: State): string => {
  const selected = selectedOffers.has(offer.id) ? 'checked' : '';

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${selected} ${isDisabled ? 'disabled' : ''}>
  <label class="event__offer-label" for="event-offer-${offer.id}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`;
};

const createOffersTemplate = (point: State, models: Models) => {
  const type = point.type;
  const selectedOffers = point.selectedOffers;
  const isDisabled = point.isDisabled;
  const availableOffers = models.offersModel.getAvailableOffers(type);

  return availableOffers.length !== 0
    ? `
    <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${availableOffers.map((offer: InnerOffer): string => createAvailableOffersTemplate(offer, selectedOffers, isDisabled)).join('')}
    </div>
      </section>`
    : '';
};

export { createOffersTemplate };
