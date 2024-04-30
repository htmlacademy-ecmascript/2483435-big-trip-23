import View from '../../../../_abstract';

const TEMPLATE = '<img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">';

export default class EventTypeIcon extends View<HTMLImageElement> {

  get template() {
    return TEMPLATE;
  }
}
