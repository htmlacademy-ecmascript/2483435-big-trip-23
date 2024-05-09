import View from '../../../../../../framework/view/_abstract';

const TEMPLATE = '<div class="event__type-list"></div>';

export default class TypeList extends View<Element> {
  get template() {
    return TEMPLATE;
  }
}
