/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../../_abstract';
import type { InnerOffer } from '../../../../types/offer';

function TEMPLATE(offer: InnerOffer){
  const { id, title, price } = offer;

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}">
  <label class="event__offer-label" for="event-offer-${id}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
}

export default class OfferItem extends View<Element> {
  offer:InnerOffer;
  constructor({ offer }: { offer: InnerOffer }) {
    super();
    this.offer = offer;
  }

  get template() {
    return TEMPLATE(this.offer);
  }
}
