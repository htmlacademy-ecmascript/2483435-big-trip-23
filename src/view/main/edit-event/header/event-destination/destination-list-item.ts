/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../../../../_abstract';
import { checkMatch } from '../../../../../utils/utils';


function getTemplate(names: any) {
  const { name, waypointName } = names;

  const isChecked = () => checkMatch(name, waypointName, 'checked');

  return `<option value="${name}"${isChecked()}></option>`;
}

export default class EventDestinationListItem extends View<HTMLDivElement> {
  name: any;
  waypointName: any;
  names: any;
  constructor(name: any, waypointName: any) {
    super();
    this.name = name;
    this.waypointName = waypointName;
    this.names = {name,waypointName};
  }

  get template() {
    return getTemplate(this.names);
  }
}
