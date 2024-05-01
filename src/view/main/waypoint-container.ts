import View from '../_abstract';

const TEMPLATE = '<li class="trip-events__item"></li>';

export default class WaypointContainer extends View<HTMLLIElement> {
  get template() {
    return TEMPLATE;
  }
}
