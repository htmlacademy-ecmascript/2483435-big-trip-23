import View from '../../framework/view/view';
import { SORT_TYPES } from '../../const';
import { upperCaseLetter } from '../../utils/utils';
import type { SortType } from '../../const';

const createSortTemplate = (type: SortType, activeSortType: SortType): string => `
<div class="trip-sort__item  trip-sort__item--${type}">
<input id="sort-${type}" class="trip-sort__input visually-hidden" data-sort-type="${type}"   type="radio" name="trip-sort" value="sort-${type}" ${type === activeSortType ? 'checked' : ''}>
<label class="trip-sort__btn" for="sort-${type}">${upperCaseLetter(type)}</label>
</div>
`;
const getTemplate = (activeSortType: SortType) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${SORT_TYPES.map((type) => createSortTemplate(type, activeSortType)).join('')}
</form>`;

export type SortHandler = (type: SortType) => void;

export default class SortingView extends View<HTMLFormElement> {
  #handleSortTypeChange: SortHandler;
  #activeSortType: SortType;

  constructor({ onSortTypeChange, activeSortType }: { onSortTypeChange: SortHandler; activeSortType: SortType }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#activeSortType = activeSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return getTemplate(this.#activeSortType);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #sortTypeChangeHandler = (evt: any) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
