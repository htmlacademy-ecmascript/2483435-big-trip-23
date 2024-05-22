import type { FilterType } from '../../const';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import type { Filter } from '../../utils/filter';
import { capitalLetter } from '../../utils/utils';

function createFilterItemTemplate(filter: Filter, isChecked: boolean) {
  const { type, count } = filter;
  return `<div class="trip-filters__filter">
  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
  ${isChecked ? 'checked' : ''}
  ${count === 0 ? 'disabled' : ''}
  >
  <label class="trip-filters__filter-label" for="filter-${type}">${capitalLetter(type)}</label>
  </div>`;
}

const createFiltersTemplate = (filters: Filter[], currentFilterType: FilterType) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterItemTemplate(filter, filter.type === currentFilterType)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
`;

export default class FilterView extends AbstractStatefulView<HTMLFormElement> {
  _restoreHandlers(): void {
    throw new Error('Method not implemented.');
  }

  #filters: Filter[];
  #currentFilterType: FilterType;
  #handleFilterTypeChange: (filterType: FilterType) => void;

  constructor({ filters, currentFilterType, onFilterTypeChange }: { filters: Filter[]; currentFilterType: FilterType, onFilterTypeChange: (filterType: FilterType) => void }) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler: EventListener = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(((evt.target as HTMLInputElement).value) as FilterType);
  };
}
