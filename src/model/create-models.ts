import DestinationsModel from './destinations';
import FilterModel from './filters';
import OffersModel from './offers';
import PointsModel from './points';
import type PointsApiService from '../service/point-api-service';


export const getModels = (service: PointsApiService) => {
  const pointsModel = new PointsModel({ service });
  const destinationsModel = new DestinationsModel({ service });
  const offersModel = new OffersModel({ service });
  const filtersModel = new FilterModel();

  return {
    pointsModel,
    destinationsModel,
    offersModel,
    filtersModel
  };

};

export type Models = ReturnType<(typeof getModels)>;

