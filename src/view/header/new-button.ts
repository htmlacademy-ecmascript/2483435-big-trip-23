import AbstractView from '../../framework/view/abstract-view';
import type { EmptyFn } from '../../types/common';

const getTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewButtonView extends AbstractView<HTMLFormElement> {
  #handleClick: EmptyFn;

  constructor({ onButtonClick: onButtonClick }: { onButtonClick: EmptyFn }) {
    super();
    this.#handleClick = onButtonClick;
    this.element.addEventListener('click', this.#onClick);
  }

  get template() {
    return getTemplate();
  }

  #onClick: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
