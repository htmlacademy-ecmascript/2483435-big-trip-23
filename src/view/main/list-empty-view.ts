import View from '../../framework/view/view';
import type { FilterType } from '../../const';
import { WaypointsEmptyMessages } from '../../const';

const createListEmptyMessageTemplate = (filter: FilterType) => `<p class="trip-events__msg">${WaypointsEmptyMessages[filter]}</p>`;

export default class ListEmptyView extends View<HTMLTableSectionElement> {
  #filter: FilterType;

  constructor(filter: FilterType) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createListEmptyMessageTemplate(this.#filter);
  }
}
