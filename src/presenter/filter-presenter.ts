import { render, replace, remove } from '../framework/render';
import FilterView from '../view/header/filter-view';
import { filter } from '../utils/filter';
import type FilterModel from '../model/filter-model';
import type PointsModel from '../model/points-model';
import type { FilterType } from '../types/common';
import { FILTER_TYPES } from '../const';
import type { Models } from '../model/create-models';

export default class FilterPresenter {
  #container: HTMLElement;
  #filterModel: FilterModel;
  #pointsModel: PointsModel;
  #filterComponent: FilterView | null = null;

  constructor({ container, models }: { container: HTMLElement; models: Models }) {
    this.#container = container;
    this.#pointsModel = models.pointsModel;
    this.#filterModel = models.filtersModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return Object.values(FILTER_TYPES).map((type) => ({
      type,
      count: filter[type](points).length,
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter ?? 'everything',
      filterTypeChangeHandler: this.#filterTypeChangeHandler,
    });

    if (prevFilterComponent === null) {
      const container = this.#container;
      if (container !== null) {
        render(this.#filterComponent, container);
        return;
      } else {
        throw new Error('Filter container is not defined');
      }
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType: FilterType) => {
    if (!this.#filterModel || this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType);
  };
}
