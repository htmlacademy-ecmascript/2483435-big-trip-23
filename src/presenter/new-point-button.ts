/* eslint-disable @typescript-eslint/no-explicit-any */
import NewEventButtonView from '../view/header/new-event-button-view';
import type { EmptyFn } from '../types/common';
import { render } from '../framework/render';

export default class AddEventButtonPresenter {
  #container: HTMLDivElement;
  #button: NewEventButtonView | null = null;
  #onButtonClick: EmptyFn;

  constructor({ container, onAddButtonClick }: { container: any; onAddButtonClick: EmptyFn }) {
    this.#container = container;
    this.#onButtonClick = onAddButtonClick;
  }

  init() {
    this.#button = new NewEventButtonView({ onButtonClick: this.#handleButton });
    render(this.#button, this.#container);
  }

  handleFormClose() {
    if (this.#button !== null) {
      this.#button.element.disabled = false;
    }
  }

  #handleButton = () => {
    this.#onButtonClick();
    if (this.#button !== null) {
      this.#button.element.disabled = true;
    }
  };

}

