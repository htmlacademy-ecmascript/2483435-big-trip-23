import View from '../../../_abstract';

const TEMPLATE = '<div class="event__type-wrapper"></div>';

export default class EventTypeWrapper extends View<Element> {
  get template() {
    return TEMPLATE;
  }
}
