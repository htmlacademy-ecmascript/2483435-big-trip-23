import View from '../../../_abstract';

const TEMPLATE = '<div class="event__field-group  event__field-group--destination"></div>';

export default class EventDestination extends View<Element> {

  get template() {
    return TEMPLATE;
  }
}


