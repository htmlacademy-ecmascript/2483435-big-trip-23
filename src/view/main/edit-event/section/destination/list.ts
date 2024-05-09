import View from '../../../../../framework/view/_abstract';

const TEMPLATE = '<div class="event__photos-tape"></div></div>';

export default class PicturesList extends View<Element> {
  get template() {
    return TEMPLATE;
  }
}
