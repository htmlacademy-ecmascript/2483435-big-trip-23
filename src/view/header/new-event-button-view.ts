/* eslint-disable @typescript-eslint/no-explicit-any */
import AbstractView from '../../framework/view/abstract-view';

const getTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewEventButtonView extends AbstractView<HTMLFormElement> {
  #handleClick: any;

  constructor({ onClick }: { onClick: any }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return getTemplate();
  }

  #clickHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
