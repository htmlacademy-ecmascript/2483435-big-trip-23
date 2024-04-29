import View from './_abstract';

const TEMPLATE = '<p class="trip-events__msg">Failed to load latest route information</p>';

export class ErrorData extends View <HTMLParagraphElement>{
  get template() {
    return TEMPLATE;
  }
}
