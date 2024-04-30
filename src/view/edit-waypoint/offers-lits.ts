import View from '../_abstract';

const TEMPLATE = '<div class="event__available-offers"></div>';

export default class OffersList extends View<Element> {
  get template() {
    return TEMPLATE;
  }
}
