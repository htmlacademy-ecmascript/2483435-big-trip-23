import View from '../../../_abstract';

const TEMPLATE = '<label class="event__label  event__type-output" for="event-destination-1">Flight</label>';

export default class EventLabelDestination extends View<HTMLLabelElement> {

  get template() {
    return TEMPLATE;
  }
}


