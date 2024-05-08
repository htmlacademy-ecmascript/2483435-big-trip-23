import View from '../../../../_abstract';
import { checkMatch } from '../../../../../utils/utils';
import type { Destination } from '../../../../../types/destination';

function getTemplate(names: { name: Destination['name']; waypointName: Destination['name'] }) {
  const { name, waypointName } = names;

  const isChecked = () => checkMatch(name, waypointName, 'checked');

  return `<option value="${name}"${isChecked()}></option>`;
}

export default class DestinationItem extends View<HTMLDivElement> {
  #name: Destination['name'];
  #destinationName: Destination['name'];

  constructor(name: Destination['name'], destinationName: Destination['name']) {
    super();
    this.#name = name;
    this.#destinationName = destinationName;
  }

  get template() {
    return getTemplate({ name: this.#name, waypointName: this.#destinationName });
  }
}
