import type { InnerOffer } from '../../../types/offer';
import View from '../../_abstract';

function getTemplate(offer: InnerOffer) {
  const { title, price } = offer;

  return `<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;
}

export default class EventOffersListItem extends View<HTMLLIElement> {
  offer: InnerOffer;
  constructor(offer: InnerOffer) {
    super();
    this.offer = offer;
  }

  get template() {
    return getTemplate(this.offer);
  }
}
