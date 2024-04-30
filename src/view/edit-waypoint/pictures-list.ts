import View from '../_abstract';

const TEMPLATE = '<div class="event__photos-container" </div>';

export default class PicturesList extends View<Element> {
  get template() {
    return TEMPLATE;
  }
}
