import View from '../../../framework/view/_abstract';

const TEMPLATE = '<form class="event event--edit" action="#" method="post"></form>';

export default class EditEventListItemContainer extends View<HTMLFormElement> {
  get template() {
    return TEMPLATE;
  }
}
