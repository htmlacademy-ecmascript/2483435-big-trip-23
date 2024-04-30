/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import View from '../_abstract';

const TEMPLATE = '<li class="trip-events__item"></li>';

export default class NewWaypoint extends View<HTMLLIElement> {
  [x: string]: any;
  get template() {
    return TEMPLATE;
  }
}
