import DestinationsModel from './destinations-model';
import FilterModel from './filter-model';
import OffersModel from './offers-model';
import PointsModel from './points-model';
import type PointsApiService from '../service/point-api-service';
import SortingModel from './sorting-model';

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
