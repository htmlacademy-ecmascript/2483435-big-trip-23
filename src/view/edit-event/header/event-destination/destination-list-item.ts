/* eslint-disable @typescript-eslint/no-explicit-any */
import { WayPoint } from '../../../../types/way-point';
import View from '../../../_abstract';
import { MOCK_CITIES } from '../../../../mock/const-mock';
import { checkMatch } from '../../../../utils/utils';

const template = (name:string, currentName: string) => {


  const isChecked = () => checkMatch(name, currentName, 'checked');

  return `<option value="${name}"${isChecked}></option>`;
};

const waypointNames = (name:string) => MOCK_CITIES.reduce((accumulator, currentValue) => accumulator + template(name, currentValue), '');

function TEMPLATE(event:any) {
  const { destination:{name} } = event;

  return `<div>${waypointNames(name)}</div>`;
}

export default class EventDestinationListItem extends View<HTMLDivElement> {
  event: WayPoint;
  constructor(event: WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return TEMPLATE(this.event);
  }
}
