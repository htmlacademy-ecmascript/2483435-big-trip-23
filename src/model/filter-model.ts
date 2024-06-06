import type { FilterType } from '../types/common';
import { FILTER_TYPES, UpdateType } from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable<UpdateType.MINOR, FilterType> {
  #filter: FilterType = FILTER_TYPES[0];

  get filter() {
    return this.#filter;
  }

  setFilter(filter: FilterType) {
    this.#filter = filter;
    this._notify(UpdateType.MINOR, filter);
  }
}
