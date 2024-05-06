import View from '../../_abstract';

const TEMPLATE = ' <h4 class="visually-hidden">Offers:</h4>';

export default class OffersTitle extends View<HTMLHeadingElement> {
  get template() {
    return TEMPLATE;
  }
}
