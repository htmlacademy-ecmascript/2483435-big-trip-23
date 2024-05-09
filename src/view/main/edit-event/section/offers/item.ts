/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../../../../framework/view/_abstract';
import type { InnerOffer } from '../../../../../types/offer';

function getTemplate(offersList: { offer: InnerOffer; selectedOffers: string[] }) {
  const { offer, selectedOffers } = offersList;

  const isSelected = () => (selectedOffers.includes(offer.id) ? 'checked' : '');

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${isSelected()}>
  <label class="event__offer-label" for="event-offer-${offer.id}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;
}

export default class OfferItem extends View<Element> {
  #offer: InnerOffer;
  #selectedOffers: string[];

  constructor(offer: InnerOffer, selectedOffers: InnerOffer['id'][]) {
    super();
    this.#offer = offer;
    this.#selectedOffers = selectedOffers;
  }

  get template() {
    return getTemplate({ offer: this.#offer, selectedOffers: this.#selectedOffers });
  }
}
