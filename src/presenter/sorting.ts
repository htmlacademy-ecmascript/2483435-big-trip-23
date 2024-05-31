import type { SortType } from '../const';
import { render } from '../framework/render';
import type { Models } from '../model/create-models';
import type SortingModel from '../model/sorting';
import SortingView from '../view/main/sorting';

export default class SortingPresenter {
  #container: HTMLTableSectionElement;
  #sortingModel: SortingModel;
  #sortComponent: SortingView | null = null;

  constructor({
    container,
    models
  }: {
    container: HTMLTableSectionElement;
    models: Models;
  }) {
    this.#container = container;
    this.#sortingModel = models.sortingModel;
  }


  #renderSorting() {
    this.#sortComponent = new SortingView({ onSortTypeChange: this.#handleSortTypeChange });
    render(this.#sortComponent, this.#container, 'afterbegin');
  }

  #handleSortTypeChange = (sortType: SortType) => {
    this.#sortingModel.changeSortType(sortType);
  };


  init() {
    this.#renderSorting();
  }
}
