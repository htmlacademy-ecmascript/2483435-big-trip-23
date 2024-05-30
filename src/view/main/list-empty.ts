import AbstractView from '../../framework/view/abstract-view';
import type { FilterType } from '../../const';
import { PointsEmptyMessages } from '../../const';

const getTemplate = (filter: FilterType) => `<p class="trip-events__msg">${PointsEmptyMessages[filter]}</p>`;

export default class ListEmptyView extends AbstractView<HTMLTableSectionElement> {
  #filter: FilterType;

  constructor(filter: FilterType) {
    super();
    this.#filter = filter;
  }

  get template() {
    return getTemplate(this.#filter);
  }
}
