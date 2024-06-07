import type { SortType } from '../types/common';
import { remove, render } from '../framework/render';
import type { Models } from '../model/create-models';
import type FilterModel from '../model/filter-model';
import type PointsModel from '../model/points-model';
import type SortingModel from '../model/sorting-model';
import SortingView from '../view/main/sorting-view';

export default class SortingPresenter {
  #container: HTMLTableSectionElement;
  #sortingModel: SortingModel;
  #sortComponent: SortingView | null = null;
  #pointsModel: PointsModel;
  #filterModel: FilterModel;

  constructor({ container, models }: { container: HTMLTableSectionElement; models: Models }) {
    this.#container = container;
    this.#sortingModel = models.sortingModel;
    this.#pointsModel = models.pointsModel;
    this.#filterModel = models.filtersModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  init() {
    this.#renderSorting();
  }

  dataLoadHandler = (isSuccessful: boolean) => {
    if (isSuccessful === false) {
      remove(this.#sortComponent);
    }
  };

  #renderSorting() {
    this.#sortComponent = new SortingView({ sortTypeChangeHandler: this.#sortTypeChangeHandler });
    render(this.#sortComponent, this.#container, 'afterbegin');
  }

  #sortTypeChangeHandler = (sortType: SortType) => {
    this.#sortingModel.setSortType(sortType);
  };

  #modelEventHandler = () => {
    remove(this.#sortComponent);
    if (this.#pointsModel.points.length > 0) {
      this.#renderSorting();
    }
  };
}
