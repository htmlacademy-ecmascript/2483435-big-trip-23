/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../framework/view/view';
import { SORT_TYPES } from '../../const';
import { upperCaseLetter } from '../../utils/utils';

const createSortTemplate = (type: any): string => `
<div class="trip-sort__item  trip-sort__item--${type}">
<input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
<label class="trip-sort__btn" for="sort-${type}">${upperCaseLetter(type)}</label>
</div>
`;
const getTemplate = `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${SORT_TYPES.map((type: string): string => createSortTemplate(type)).join('')}
</form>`;

export default class SortingView extends View<HTMLFormElement> {
  get template() {
    return getTemplate;
  }
}
