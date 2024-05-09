/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import View from '../../../framework/view/_abstract';

const TEMPLATE = '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>';

export default class Rollup extends View<HTMLButtonElement> {
  #handleClick: any;

  constructor(onClick: any) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return TEMPLATE;
  }

  #clickHandler = (evt: Event) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
