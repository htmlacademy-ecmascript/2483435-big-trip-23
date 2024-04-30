/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import View from '../_abstract';

const TEMPLATE = '<form class="event event--edit" action="#" method="post"></form>';

export default class EventEdit extends View<HTMLFormElement> {
  get template() {
    return TEMPLATE;
  }
}
