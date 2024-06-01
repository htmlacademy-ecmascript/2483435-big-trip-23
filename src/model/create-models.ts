import DestinationsModel from './destinations';
import FilterModel from './filter';
import OffersModel from './offers';
import PointsModel from './points';
import type PointsApiService from '../service/point-api-service';
import SortingModel from './sorting';

export const getModels = (service: PointsApiService) => {
  const pointsModel = new PointsModel({ service });
  const destinationsModel = new DestinationsModel({ service });
  const offersModel = new OffersModel({ service });
  const filtersModel = new FilterModel();
  const sortingModel = new SortingModel();

  return {
    pointsModel,
    destinationsModel,
    offersModel,
    filtersModel,
    sortingModel,
  };
};

export type Models = ReturnType<typeof getModels>;
