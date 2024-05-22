import { render, replace, remove } from '../framework/render';
import FilterView from '../view/header/filter-view';
import { filter } from '../utils/filter';
import type FilterModel from '../model/filter-model';
import type WaypointsModel from '../model/waypoints-model';
import type { FilterType } from '../const';
import { FILTER_TYPES } from '../const';

export default class FilterPresenter {
  #filterContainer: HTMLElement | null = null;
  #filterModel: FilterModel | null = null;
  #waypointsModel: WaypointsModel | null = null;

  #filterComponent: FilterView | null = null;

  constructor({
    filterContainer,
    filterModel,
    waypointsModel,
  }: {
    filterContainer: HTMLElement;
    filterModel: FilterModel;
    waypointsModel: WaypointsModel;
  }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#waypointsModel = waypointsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const waypoints = this.#waypointsModel!.waypoints;

    return Object.values(FILTER_TYPES).map((type) => ({
      type,
      count: filter[type](waypoints).length,
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel!.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer!);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType: FilterType) => {
    if (this.#filterModel!.filter === filterType) {
      return;
    }

    this.#filterModel!.setFilter('major', filterType);
  };
}
