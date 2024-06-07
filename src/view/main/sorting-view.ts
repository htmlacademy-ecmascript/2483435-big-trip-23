import AbstractView from '../../framework/view/abstract-view';
import { SORT_TYPES } from '../../const';
import { upperCaseLetter } from '../../utils/utils';
import type { SortType } from '../../types/common';

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
  #sortTypeChangeHandler: SortHandler;

  constructor({ sortTypeChangeHandler: sortTypeChangeHandler }: { sortTypeChangeHandler: SortHandler }) {
    super();
    this.#sortTypeChangeHandler = sortTypeChangeHandler;

    this.element.addEventListener('input', this.#sortTypeChangingHandler);
  }

  get template() {
    return getTemplate();
  }

  #sortTypeChangingHandler: EventListener = (evt) => {
    if (!(evt.target instanceof HTMLInputElement)) {
      return;
    }
    const newSortType = evt.target.value as SortType;
    this.#sortTypeChangeHandler(newSortType);
  };
}
