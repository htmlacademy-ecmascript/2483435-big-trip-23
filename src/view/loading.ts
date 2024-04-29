import View from './_abstract';

const TEMPLATE = '<p class="trip-events__msg">Loading...</p>';

export class Loading extends View <HTMLParagraphElement>{
  get template() {
    return TEMPLATE;
  }
}
