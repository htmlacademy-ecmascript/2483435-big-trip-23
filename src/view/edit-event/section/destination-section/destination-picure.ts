

/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../../_abstract';
import type { InnerOffer } from '../../../../types/offer';

function TEMPLATE(offer: InnerOffer){
  const { id, title, price } = offer;

  return `<img class="event__photo" src="img/photos/1.jpg" alt="Event photo">`;
}

export default class DestinationPicture extends View<Element> {
  offer:InnerOffer;
  constructor({ offer }: { offer: InnerOffer }) {
    super();
    this.offer = offer;
  }

  get template() {
    return TEMPLATE(this.offer);
  }
}
