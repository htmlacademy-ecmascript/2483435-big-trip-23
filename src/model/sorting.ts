import type { SortType, UpdateType } from '../const';
import { SORT_TYPES } from '../const';
import Observable from '../framework/observable';
import type { Point } from '../types/point-type';
import { daySort, priceSort, timeSort } from '../utils/sorting';

export default class SortingModel extends Observable<UpdateType.MAJOR, SortType> {
  #type: SortType = SORT_TYPES[0];

  getSorteredPoints = (points: Point[], sortType: SortType) => {
    if (sortType === 'event' || sortType === 'offers') {
      return points;
    }
    switch (sortType) {
      case 'day':
        return points.sort(daySort);
      case 'time':
        return points.sort(timeSort);
      case 'price':
        return points.sort(priceSort);
    }
  };

  get type() {
    return this.#type;
  }

  changeSortType = (sortType: SortType) => {
    this.#type = sortType;
  };

  setSortType(sortType: SortType) {
    this.#type = sortType;
  }

}
