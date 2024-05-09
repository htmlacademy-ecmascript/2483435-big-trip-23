/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../../../framework/view/_abstract';

const TEMPLATE = '<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>';

export default class EventSave extends View<HTMLButtonElement> {
  #handleFormSubmit: any;

  constructor(onFormSubmit: any) {
    super();
    this.#handleFormSubmit = onFormSubmit;

    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return TEMPLATE;
  }

  #formSubmitHandler = (evt: Event) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
