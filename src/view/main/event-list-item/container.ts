import View from '../../../framework/view/_abstract';

const TEMPLATE = '<div class="event"></div>';

export default class EventListItemContainer extends View<HTMLLIElement> {
  get template() {
    return TEMPLATE;
  }
}
