import type { AppPicture } from '../../../../../types/destination';
import View from '../../../../_abstract';

function getTemplate(waypoint: AppPicture) {
  const { src, description } = waypoint;
  return `<img class="event__photo" src="${src}" alt="${description}">`;
}

export default class Picture extends View<Element> {
  constructor(private picture: AppPicture) {
    super();
  }

  get template() {
    return getTemplate(this.picture);
  }
}
