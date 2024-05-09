import View from '../../../../../../framework/view/_abstract';

const TEMPLATE = '<label class="event__type  event__type-btn" for="event-type-toggle-1"></label>';

export default class TypeLabel extends View<HTMLHeadElement> {
  get template() {
    return TEMPLATE;
  }
}
