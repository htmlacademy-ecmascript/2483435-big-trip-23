import View from '../_abstract';

const TEMPLATE = '<form class="event event--edit" action="#" method="post"></form>';

export default class EditItemContainer extends View<HTMLFormElement> {

  get template() {
    return TEMPLATE;
  }
}


