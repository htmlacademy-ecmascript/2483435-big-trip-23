import type { SortType } from '../const';
import { remove, render } from '../framework/render';
import type { Models } from '../model/create-models';
import type FilterModel from '../model/filter-model';
import type PointsModel from '../model/points-model';
import type SortingModel from '../model/sorting-model';
import SortingView from '../view/main/sorting';

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

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #renderSorting() {
    this.#sortComponent = new SortingView({ onSortTypeChange: this.#handleSortTypeChange });
    render(this.#sortComponent, this.#container, 'afterbegin');
  }

  #handleSortTypeChange = (sortType: SortType) => {
    this.#sortingModel.setSortType(sortType);
  };

  #handleModelEvent = () => {
    remove(this.#sortComponent);
    this.#renderSorting();
  };

}
