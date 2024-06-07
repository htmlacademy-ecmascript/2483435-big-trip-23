import AbstractView from '../../framework/view/abstract-view';
import type { EmptyFn } from '../../types/common';

const getTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewButtonView extends AbstractView<HTMLFormElement> {
  #newButtonClickHandler: EmptyFn;

  constructor({ newButtonClickHandler: newButtonClickHandler }: { newButtonClickHandler: EmptyFn }) {
    super();
    this.#newButtonClickHandler = newButtonClickHandler;
    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return getTemplate();
  }

  #buttonClickHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#newButtonClickHandler();
  };
}
