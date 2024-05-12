import { capitalLetter, checkMatch } from '../../utils/utils';
import type { WaypointType } from '../../types/waypoint-type';
import { POINTS_TYPES } from '../../const';

const getTemplate = (waypointsType: WaypointType, type: WaypointType) =>
  `<div class="event__type-item"><input id="event-type-${waypointsType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${waypointsType}" ${checkMatch(type, waypointsType, 'checked')}>
  <label class="event__type-label  event__type-label--${waypointsType}" for="event-type-${waypointsType}-1">${capitalLetter(waypointsType)}</label>
</div>`;

const createWaypointsTypesListTemplate = (type: WaypointType) =>
  POINTS_TYPES.map((waypointsType: WaypointType): string => getTemplate(waypointsType, type)).join('');

export { createWaypointsTypesListTemplate };
