import View from '../../../../_abstract';
import { MOCK_CITIES } from '../../../../../mock/const';
import { checkMatch } from '../../../../../utils/utils';
import { Destination } from '../../../../../types/destination';

const getTemplateName = (name: string, currentName: string) => {
  const isChecked = () => checkMatch(name, currentName, 'checked');

  return `<option value="${name}"${isChecked}></option>`;
};

const waypointNames = (name: string) =>
  MOCK_CITIES.reduce((accumulator, currentValue) => accumulator + getTemplateName(name, currentValue), '');

function getTemplate(destination: Destination) {
  const { name } = destination;

  const currentName = 'name' in destination ? name : '';

  return `<div>${waypointNames(currentName)}</div>`;
}

export default class EventDestinationListItem extends View<HTMLDivElement> {
  destination: Destination;
  constructor(destination: Destination) {
    super();
    this.destination = destination;
  }

  get template() {
    return getTemplate(this.destination);
  }
}
