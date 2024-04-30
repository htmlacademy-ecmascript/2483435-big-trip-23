import View from '../_abstract';

const TEMPLATE = '<div class="event"></div>';

export default class EventItemContainer extends View<HTMLLIElement> {

  get template() {
    return TEMPLATE;
  }
}
