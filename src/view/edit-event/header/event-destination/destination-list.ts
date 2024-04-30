import View from '../../../_abstract';

const TEMPLATE = '<datalist id="destination-list-1"></datalist>';

export default class EventDestinationList extends View<HTMLDataListElement> {

  get template() {
    return TEMPLATE;
  }
}


