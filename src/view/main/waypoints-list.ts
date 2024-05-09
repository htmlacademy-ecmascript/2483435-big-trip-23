import View from '../../framework/view/view';

const TEMPLATE = '<ul class="trip-events__list" id = "event_list"> </ul>';
export default class WaypointsList extends View<HTMLUListElement> {
  get template() {
    return TEMPLATE;
  }
}
