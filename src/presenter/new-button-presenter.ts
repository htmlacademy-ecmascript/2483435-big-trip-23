import NewButtonView from '../view/header/new-button-view';
import type { EmptyFn } from '../types/common';
import { render } from '../framework/render';

export default class NewButtonPresenter {
  #container: HTMLDivElement;
  #button: NewButtonView | null = null;
  #buttonClickHandler: EmptyFn;

  constructor({ container, newButtonClickHandler: newButtonClickHandler }: { container: HTMLDivElement; newButtonClickHandler: EmptyFn }) {
    this.#container = container;
    this.#buttonClickHandler = newButtonClickHandler;
  }

  init() {
    this.#button = new NewButtonView({ newButtonClickHandler: this.#newButtonClickHandler });
    render(this.#button, this.#container);
  }

  dataLoadHandler = (isSuccessful: boolean) => {
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

  #newButtonClickHandler = () => {
    this.#buttonClickHandler();
    if (this.#button !== null) {
      this.#button.element.disabled = true;
    }
  };
}
