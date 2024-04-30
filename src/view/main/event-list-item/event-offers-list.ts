

import View from '../../_abstract';

const TEMPLATE = '<ul class="event__selected-offers"></ul>';

export default class EventOffersList extends View<HTMLUListElement> {
  get template() {
    return TEMPLATE;
  }
}
