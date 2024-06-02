import type { Models } from '../../model/create-models';

export const cost = (models: Models) => {
  const points = models.pointsModel.points;

  return points.reduce((sum, point) => sum + (point.basePrice + models.offersModel.getSelectedOffersPrice(point)), 0);
};
