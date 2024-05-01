import { WayPoint } from '../../../../types/way-point';
import View from '../../../_abstract';
import { MOCK_CITIES } from '../../../../mock/const-mock';
import { checkMatch } from '../../../../utils/utils';

const getTemplateName = (name: string, currentName: string) => {
  const isChecked = () => checkMatch(name, currentName, 'checked');

  return `<option value="${name}"${isChecked}></option>`;
};

const waypointNames = (name: string) =>
  MOCK_CITIES.reduce((accumulator, currentValue) => accumulator + getTemplateName(name, currentValue), '');

function getTemplate(event: WayPoint) {
  const { destination } = event;
  const name = 'name' in destination ? (destination.name as string) : '';
  return `<div>${waypointNames(name)}</div>`;
}

export default class EventDestinationListItem extends View<HTMLDivElement> {
  event: WayPoint;
  constructor(event: WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return getTemplate(this.event);
  }
}
