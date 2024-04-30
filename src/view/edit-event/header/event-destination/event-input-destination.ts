import View from '../../../_abstract';

const TEMPLATE = '<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1"></div>';

export default class EventInputDestination extends View<HTMLInputElement> {

  get template() {
    return TEMPLATE;
  }
}


