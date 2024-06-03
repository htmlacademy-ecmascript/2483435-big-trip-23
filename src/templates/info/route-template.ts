import type { Models } from '../../model/create-models';

const Amount = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

export const route = (models: Models) => {
  const points = models.sortingModel.getSortedPoints(models.pointsModel.points, 'day');
  const allPointsNames = points.map((point) => models.destinationsModel.getDestinationByID(point.destination)!.name);

  switch (allPointsNames.length) {
    case Amount.ONE:
      return `${allPointsNames[0]}`;
    case Amount.TWO:
      return `${allPointsNames[0]} — ${allPointsNames[1]}`;
    case Amount.THREE:
      return `${allPointsNames[0]} — ${allPointsNames[1]} — ${allPointsNames[2]}`;
    default:
      return `${allPointsNames[0]} — ... — ${allPointsNames[allPointsNames.length - 1]}`;
  }
};
