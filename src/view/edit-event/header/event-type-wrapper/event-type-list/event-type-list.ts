import View from '../../../../_abstract';

const TEMPLATE = '<div class="event__type-list"></div>';

export default class EventTypeList extends View<Element> {

  get template() {
    return TEMPLATE;
  }
}
