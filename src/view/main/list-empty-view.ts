import View from '../../framework/view/view';
import { WaypointsEmptyMessages } from '../../const';

const createListEmptyMessageTemplate = (filter: string) => `<p class="trip-events__msg">${WaypointsEmptyMessages[filter]}</p>`;

export default class ListEmptyView extends View<HTMLTableSectionElement> {
  #filter: string;

  constructor(filter: string) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createListEmptyMessageTemplate(this.#filter);
  }
}
