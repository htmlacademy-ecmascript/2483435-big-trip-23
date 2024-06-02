/* eslint-disable @typescript-eslint/no-explicit-any */
import NewButtonView from '../view/header/new-button';
import type { EmptyFn } from '../types/common';
import { render } from '../framework/render';

export default class NewButtonPresenter {
  #container: HTMLDivElement;
  #button: NewButtonView | null = null;
  #onButtonClick: EmptyFn;

  constructor({ container, onNewButtonClick: onNewButtonClick }: { container: any; onNewButtonClick: EmptyFn }) {
    this.#container = container;
    this.#onButtonClick = onNewButtonClick;
  }

  init() {
    this.#button = new NewButtonView({ onButtonClick: this.#handleButton });
    render(this.#button, this.#container);
  }

  activate() {
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
