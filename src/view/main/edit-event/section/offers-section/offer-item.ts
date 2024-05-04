/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../../../_abstract';
import type { InnerOffer } from '../../../../../types/offer';

function getTemplate(offersList: any) {
  const { offer, selectedOffersIds } = offersList;

  const isSelected = () => (selectedOffersIds.includes(offer.id) ? 'checked' : '');

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
  offer: InnerOffer;
  selectedOffersIds: any;
  offersList: any;
  constructor({ offer, selectedOffersIds }: { offer: InnerOffer; selectedOffersIds: any }) {
    super();
    this.offer = offer;
    this.selectedOffersIds = selectedOffersIds;
    this.offersList = { offer, selectedOffersIds };
  }

  get template() {
    return getTemplate(this.offersList);
  }
}
