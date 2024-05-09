import View from '../../../../../framework/view/_abstract';

const TEMPLATE = `<section class="event__section  event__section--offers">
<h3 class="event__section-title  event__section-title--offers">Offers</h3>
</section>`;

export default class OffersSection extends View<HTMLTableSectionElement> {
  get template() {
    return TEMPLATE;
  }
}
