import type { Models } from '../../model/create-models';
import { appDay } from '../../utils/time/time';

export const date = (models: Models) => {
  const points = models.sortingModel.getSortedPoints(models.pointsModel.points, 'day');
  const start = appDay(points[0].dateFrom).format('DD MMM');
  const end = appDay(points[points.length - 1].dateTo).format('DD MMM');

  return `${start} — ${end}`;
};
