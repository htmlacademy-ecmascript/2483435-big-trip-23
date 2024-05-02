import View from '../../../_abstract';

const TEMPLATE = `
<section class="event__details"></section>`;

export default class EventDetails extends View<HTMLDivElement> {
  get template() {
    return TEMPLATE;
  }
}
