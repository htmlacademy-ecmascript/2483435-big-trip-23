/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Models } from '../model/create-models';
import { getPageElements } from '../page-elements';
import type PointsApiService from '../service/point-api-service';
import FilterPresenter from './filter-presenter';
import InfoPresenter from './info-presenter';
import ListPresenter from './list-presenter';
import NewButtonPresenter from './new-button-presenter';
import SortingPresenter from './sorting-presenter';

export default class MainPresenter {
  #elements = getPageElements();
  #service: PointsApiService;
  #models: Models;
  #info: InfoPresenter | null = null;
  #filter: FilterPresenter | null = null;
  #newButton: NewButtonPresenter | null = null;
  #sorting: SortingPresenter | null = null;
  #list: ListPresenter | null = null;

  constructor({ service, models }: { service: PointsApiService; models: Models }) {
    this.#service = service;
    this.#models = models;

    this.#list = new ListPresenter({ container: this.#elements.events!, models: this.#models, onFormClose: this.#handleCloseForm });
    this.#info = new InfoPresenter({ container: this.#elements.header as HTMLElement, models: this.#models });
    this.#filter = new FilterPresenter({ container: this.#elements.filters as HTMLElement, models: this.#models });
    this.#newButton = new NewButtonPresenter({ container: this.#elements.header, onNewButtonClick: this.#handleNewButton });
    this.#sorting = new SortingPresenter({ container: this.#elements.events!, models: this.#models });
  }

  init() {
    this.#list?.init();
    this.#filter?.init();
    this.#newButton?.init();
    this.#info?.init();
  }

  #handleNewButton = () => {
    if (this.#list !== null) {
      this.#list.createPoint();
    }
  };

  #handleCloseForm = () => this.#newButton?.activate() ?? null;
}
