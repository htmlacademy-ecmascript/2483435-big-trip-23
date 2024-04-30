import View from '../_abstract';

const TEMPLATE = '<div class="event__available-offers"></div>';

export default class EventOffer extends View<HTMLDivElement> {
  get template() {
    return TEMPLATE;
  }
}
