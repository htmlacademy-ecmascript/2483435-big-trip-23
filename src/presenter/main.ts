/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Models } from '../model/create-models';
import { getPageElements } from '../page-elements';
import type PointsApiService from '../service/point-api-service';
import FilterPresenter from './filter';
import InfoPresenter from './info';
import ListPresenter from './list';
import AddEventButtonPresenter from './new-button';
import SortingPresenter from './sorting';

export default class MainPresenter {
  #elements = getPageElements();
  #service: PointsApiService;
  #models: Models;
  #info: InfoPresenter | null = null;
  #filter: FilterPresenter | null = null;
  #addButton: AddEventButtonPresenter | null = null;
  #sorting: SortingPresenter | null = null;
  #list: ListPresenter | null = null;

  constructor({ service, models }: { service: PointsApiService; models: Models }) {
    this.#service = service;
    this.#models = models;

    this.#list = new ListPresenter({ container: this.#elements.events!, models: this.#models, onFormClose: this.#handleCloseForm });
    this.#info = new InfoPresenter({ container: this.#elements.header as HTMLElement, models: this.#models });
    this.#filter = new FilterPresenter({ container: this.#elements.filters as HTMLElement, models: this.#models });
    this.#addButton = new AddEventButtonPresenter({ container: this.#elements.header, onAddButtonClick: this.#handleAddButton });
    this.#sorting = new SortingPresenter({ container: this.#elements.events!, models: this.#models });
  }

  init() {
    this.#list?.init();
    this.#filter?.init();
    this.#addButton?.init();
    this.#info?.init();
  }

  #handleAddButton = () => {
    if (this.#list !== null) {
      this.#list.createPoint();
    }
  };

  #handleCloseForm = () => this.#addButton?.activate() ?? null;
}
