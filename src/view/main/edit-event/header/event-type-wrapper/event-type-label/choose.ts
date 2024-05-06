import View from '../../../../../_abstract';

const TEMPLATE = '<span class="visually-hidden">Choose event type</span>';

export default class ChooseType extends View<HTMLSpanElement> {
  get template() {
    return TEMPLATE;
  }
}
