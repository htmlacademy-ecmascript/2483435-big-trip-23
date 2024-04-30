/* eslint-disable @typescript-eslint/no-explicit-any */
import { WayPoint } from '../../../../types/way-point';
import View from '../../../_abstract';


function TEMPLATE(waypoint: any){
  const { src} = waypoint;
  return `<img class="event__photo" src="${src}" alt="Event photo">`;
}

export default class DestinationPicture extends View<Element> {
  waypoint:WayPoint;
  constructor(waypoint:WayPoint) {
    super();
    this.waypoint = waypoint;
  }

  get template() {
    return TEMPLATE(this.waypoint);
  }
}
