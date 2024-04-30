import View from './_abstract';

const TEMPLATE = '<li class="trip-events__item"></li>';

export default class Waypoint extends View<HTMLLIElement> {

  get template() {
    return TEMPLATE;
  }
}
