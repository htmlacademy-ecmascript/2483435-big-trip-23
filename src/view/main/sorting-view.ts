import AbstractView from '../../framework/view/view';
import { SORT_TYPES } from '../../const';
import { upperCaseLetter } from '../../utils/utils';
import type { SortType } from '../../const';

const createSortTemplate = (type: SortType, isActive: boolean): string => `
<div class="trip-sort__item  trip-sort__item--${type}">
<input id="sort-${type}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="${type}" ${isActive ? 'checked' : ''}>
<label class="trip-sort__btn" for="sort-${type}">${upperCaseLetter(type)}</label>
</div>
`;
const getTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${SORT_TYPES.map((type, index) => createSortTemplate(type, index === 0)).join('')}
</form>`;

export type SortHandler = (type: SortType) => void;

export default class SortingView extends AbstractView<HTMLFormElement> {
  #handleSortTypeChange: SortHandler;

  constructor({ onSortTypeChange }: { onSortTypeChange: SortHandler }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('input', this.#sortTypeChangeHandler);
  }

  get template() {
    return getTemplate();
  }

  #sortTypeChangeHandler: EventListener = (evt) => {
    if (!(evt.target instanceof HTMLInputElement)) {
      return;
    }

    const newSortType = evt.target.value as SortType;
    this.#handleSortTypeChange(newSortType);
  };
}
