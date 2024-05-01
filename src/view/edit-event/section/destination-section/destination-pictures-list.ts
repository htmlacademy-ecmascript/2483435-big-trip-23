import View from '../../../_abstract';

const TEMPLATE = '<div class="event__photos-tape"></div></div>';

export default class DestinationPicturesList extends View<Element> {
  get template() {
    return TEMPLATE;
  }
}
