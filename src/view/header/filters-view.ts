import View from '../../framework/view/view';
import type { Filters } from '../../utils/filter';
import { capitalLetter } from '../../utils/utils';

function createFilterItemTemplate(filter: Filters[number], isChecked: boolean) {
  const { type, count } = filter;
  return `<div class="trip-filters__filter">
  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
  ${isChecked ? 'checked' : ''}
  ${count === 0 ? 'disabled' : ''}
  >
  <label class="trip-filters__filter-label" for="filter-${type}">${capitalLetter(type)}</label>
  </div>`;
}

const createFiltersTemplate = (filters: Filters, currentFilter: string) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterItemTemplate(filter, filter.type === currentFilter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
`;

export default class FiltersView extends View<HTMLFormElement> {
  #filters: Filters;
  #currentFilter: string;

  constructor({ filters, currentFilter }: { filters: Filters; currentFilter: string }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }
}
