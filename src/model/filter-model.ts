import type { FilterType, UpdateType } from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable<UpdateType.MAJOR, FilterType> {
  #filter: FilterType = 'everything';

  get filter() {
    return this.#filter;
  }

  setFilter(updateType: UpdateType.MAJOR, filter: FilterType) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
