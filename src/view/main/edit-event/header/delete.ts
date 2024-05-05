import View from '../../../_abstract';

const TEMPLATE = '<button class="event__reset-btn" type="reset">Delete</button>';

export default class EventDelete extends View<HTMLButtonElement> {
  get template() {
    return TEMPLATE;
  }
}
