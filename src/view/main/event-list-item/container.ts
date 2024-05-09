import View from '../../_abstract';

const TEMPLATE = '<div class="event"></div>';

export default class EventListItemContainer extends View<Element> {
  get template() {
    return TEMPLATE;
  }
}
