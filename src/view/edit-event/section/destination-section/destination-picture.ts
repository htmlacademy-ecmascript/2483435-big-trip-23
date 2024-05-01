import type { AppPicture } from '../../../../types/destination';
import View from '../../../_abstract';

function getTemplate(waypoint: AppPicture) {
  const { src } = waypoint;
  return `<img class="event__photo" src="${src}" alt="Event photo">`;
}

export default class DestinationPicture extends View<Element> {
  constructor(private picture: AppPicture) {
    super();
  }

  get template() {
    return getTemplate(this.picture);
  }
}
