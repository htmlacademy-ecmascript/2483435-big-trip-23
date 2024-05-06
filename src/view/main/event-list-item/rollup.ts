import View from '../../_abstract';

const TEMPLATE = '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>';

export default class Rollup extends View<HTMLButtonElement> {
  get template() {
    return TEMPLATE;
  }
}
