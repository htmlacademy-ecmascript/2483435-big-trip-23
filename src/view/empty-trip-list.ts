import View from './_abstract';

const TEMPLATE = '<p class="trip-events__msg">Click New Event to create your first point</p>';

export class EmptyTripList extends View <HTMLParagraphElement> {
  get template() {
    return TEMPLATE;
  }
}
