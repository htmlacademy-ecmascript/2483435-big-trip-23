import View from '../../../../_abstract';

const TEMPLATE = '<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">';

export default class EventTypeToggle extends View<HTMLHeadElement> {
  get template() {
    return TEMPLATE;
  }
}
