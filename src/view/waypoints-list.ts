import View from './_abstract';

const TEMPLATE = '<ul class="trip-events__list"> </ul>';
export default class WaypointsLis extends View<HTMLUListElement> {
  get template() {
    return TEMPLATE;
  }
}
