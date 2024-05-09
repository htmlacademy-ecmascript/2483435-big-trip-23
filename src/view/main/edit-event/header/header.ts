import View from '../../../../framework/view/_abstract';

const TEMPLATE = '<header class="event__header"></header>';

export default class EventHeader extends View<HTMLHeadElement> {
  get template() {
    return TEMPLATE;
  }
}
