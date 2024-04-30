import View from '../../../../_abstract';

const TEMPLATE = `<fieldset class="event__type-group">
<legend class="visually-hidden">Event type</legend>
</fieldset>`;

export default class EventTypeGroup extends View<HTMLFieldSetElement> {

  get template() {
    return TEMPLATE;
  }
}
