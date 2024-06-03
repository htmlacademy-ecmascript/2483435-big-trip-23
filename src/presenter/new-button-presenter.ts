import NewButtonView from '../view/header/new-button-view';
import type { EmptyFn } from '../types/common';
import { render } from '../framework/render';

export default class NewButtonPresenter {
  #container: HTMLDivElement;
  #button: NewButtonView | null = null;
  #onButtonClick: EmptyFn;

  constructor({ container, onNewButtonClick: onNewButtonClick }: { container: HTMLDivElement; onNewButtonClick: EmptyFn }) {
    this.#container = container;
    this.#onButtonClick = onNewButtonClick;
  }

  init() {
    this.#button = new NewButtonView({ onButtonClick: this.#handleButtonClick });
    render(this.#button, this.#container);
  }

  handleDataLoad = (isSuccessful: boolean) => {
    if (isSuccessful === false) {
      if (this.#button !== null) {
        this.#button.element.disabled = true;
      }
    }
  };

  activate() {
    if (this.#button !== null) {
      this.#button.element.disabled = false;
    }
  }

  #handleButtonClick = () => {
    this.#onButtonClick();
    if (this.#button !== null) {
      this.#button.element.disabled = true;
    }
  };
}
