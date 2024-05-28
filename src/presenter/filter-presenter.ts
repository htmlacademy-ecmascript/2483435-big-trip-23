import { render, replace, remove } from '../framework/render';
import FilterView from '../view/header/filter-view';
import { filter } from '../utils/filter';
import type FilterModel from '../model/filter-model';
import type PointsModel from '../model/points-model';
import type { FilterType } from '../const';
import { FILTER_TYPES, UpdateType } from '../const';

export default class FilterPresenter {
  #filterContainer: HTMLElement | null = null;
  #filterModel: FilterModel | null = null;
  #pointsModel: PointsModel | null = null;

  #filterComponent: FilterView | null = null;

  constructor({
    filterContainer,
    filterModel,
    pointsModel: pointsModel,
  }: {
    filterContainer: HTMLElement;
    filterModel: FilterModel;
    pointsModel: PointsModel;
  }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel?.points ?? [];

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
      currentFilterType: this.#filterModel?.filter ?? 'everything',
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      const container = this.#filterContainer;
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

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType: FilterType) => {
    if (!this.#filterModel || this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
