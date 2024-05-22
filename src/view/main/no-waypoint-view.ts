import View from '../../framework/view/view';
import type { FilterType } from '../../const';
import { WaypointsEmptyMessages } from '../../const';

const getTemplate = (filter: FilterType) => `<p class="trip-events__msg">${WaypointsEmptyMessages[filter]}</p>`;

export default class NoWaypointView extends View<HTMLTableSectionElement> {
  #filter: FilterType;

  constructor(filter: FilterType) {
    super();
    this.#filter = filter;
  }

  get template() {
    return getTemplate(this.#filter);
  }
}