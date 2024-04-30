import View from '../../../../_abstract';

const TEMPLATE = `<div class="event__type-item">
<input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
<label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
</div>`;

export default class EventTypeItem extends View<Element> {

  get template() {
    return TEMPLATE;
  }
}
