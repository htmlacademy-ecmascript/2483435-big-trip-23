import View from './_abstract';

const TEMPLATE = '<section class="event__details"> </section>';

export default class OffersList extends View<HTMLTableSectionElement> {
  get template() {
    return TEMPLATE;
  }
}
