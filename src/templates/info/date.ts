import type { Models } from '../../model/create-models';
import { appDay } from '../../utils/time/time';

const isSameMonth = (start: string, end: string) => start.split(' ')[1] === end.split(' ')[1];

export const date = (models: Models) => {
  const points = models.pointsModel.points;
  let start = appDay(points[0].dateFrom).format('DD MMM');
  const end = appDay(points[points.length - 1].dateTo).format('DD MMM');

  start = isSameMonth(start, end) ? start.split(' ')[0] : start;

  return `${start} — ${end}`;
};
