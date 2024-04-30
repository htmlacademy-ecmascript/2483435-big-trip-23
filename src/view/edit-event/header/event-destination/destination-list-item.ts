import View from '../../../_abstract';

const TEMPLATE = '<option value="Chamonix"></option>';

export default class EventDestinationListItem extends View<HTMLOptionElement> {

  get template() {
    return TEMPLATE;
  }
}


