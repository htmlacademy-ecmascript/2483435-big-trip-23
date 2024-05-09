import View from '../../../../../../framework/view/_abstract';

const TEMPLATE = `<fieldset class="event__type-group">
<legend class="visually-hidden">Event type</legend>
</fieldset>`;

export default class TypeGroup extends View<HTMLFieldSetElement> {
  get template() {
    return TEMPLATE;
  }
}
