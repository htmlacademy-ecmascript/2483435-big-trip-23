import type { Models } from '../model/create-models';

export default class InfoPresenter {
  #container: HTMLElement;
  #models: Models;

  constructor({ container, models }: { container: HTMLElement; models: Models }) {
    this.#container = container;
    this.#models = models;
  }

  #renderTripMain() {
    // render(new MainTripView(), this.#tripMainContainer, 'afterbegin');
  }
}
