import View from '../../framework/view/view';

const TEMPLATE = '<ul class="trip-events__list"></ul>';

export default class MainListContainer extends View<HTMLUListElement> {
  get template() {
    return TEMPLATE;
  }
}
