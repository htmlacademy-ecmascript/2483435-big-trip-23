import View from '../../framework/view/view';
import { SORT_TYPES } from '../../const';
import { upperCaseLetter } from '../../utils/utils';
import type { SortType } from '../../const';

const createSortTemplate = (type: SortType): string => `
<div class="trip-sort__item  trip-sort__item--${type}">
<input id="sort-${type}" class="trip-sort__input visually-hidden" data-sort-type="${type}"   type="radio" name="trip-sort" value="sort-${type}" ${type === 'day' ? 'checked' : ''}>
<label class="trip-sort__btn" for="sort-${type}">${upperCaseLetter(type)}</label>
</div>
`;
const getTemplate = `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${SORT_TYPES.map(createSortTemplate).join('')}
</form>`;

export type SortHandler = (type: SortType) => void;

export default class SortingView extends View<HTMLFormElement> {
  #handleSortTypeChange: SortHandler;

  constructor({ onSortTypeChange }: { onSortTypeChange: SortHandler }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return getTemplate;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #sortTypeChangeHandler = (evt: any) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
