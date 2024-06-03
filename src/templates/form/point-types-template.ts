import { capitalLetter, checkMatch } from '../../utils/utils';
import type { PointType } from '../../types/point-type';
import { POINTS_TYPES } from '../../const';
import { FormNames } from './form-template';
import he from 'he';

const getTemplate = (pointsType: PointType, type: PointType) =>
  `<div class="event__type-item"><input id="event-type-${pointsType}-1" class="event__type-input  visually-hidden" type="radio" name="${FormNames.Type}" value="${pointsType}" ${checkMatch(type, pointsType, 'checked')}>
  <label class="event__type-label  event__type-label--${pointsType}" for="event-type-${pointsType}-1">${he.escape(capitalLetter(pointsType))}</label>
</div>`;

const createPointsTypesListTemplate = (type: PointType) =>
  POINTS_TYPES.map((pointsType: PointType): string => getTemplate(pointsType, type)).join('');

export { createPointsTypesListTemplate };
