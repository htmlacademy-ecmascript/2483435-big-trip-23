import { WayPoint } from '../../types/way-point';

import View from '../_abstract';

const TEMPLATE = '<li class="trip-events__item"></li>';

export default class WaypointContainer extends View<HTMLLIElement> {
  waypoints: WayPoint[] = [];

  constructor() {
    super();
  }

  get template() {
    return TEMPLATE;
  }
}
