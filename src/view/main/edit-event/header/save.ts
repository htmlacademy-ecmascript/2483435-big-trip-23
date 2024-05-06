import View from '../../../_abstract';

const TEMPLATE = '<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>';

export default class EventSave extends View<HTMLButtonElement> {
  get template() {
    return TEMPLATE;
  }
}
