import type { FilterType } from '../const';
import { UpdateType } from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable<UpdateType.MINOR, FilterType> {
  #filter: FilterType = 'everything';

  get filter() {
    return this.#filter;
  }

  setFilter(filter: FilterType) {
    this.#filter = filter;
    this._notify(UpdateType.MINOR, filter);
  }
}
