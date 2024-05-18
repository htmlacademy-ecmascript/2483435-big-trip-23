import type { DataBase } from '@presenter/main-presenter';
import type { Waypoint } from '../types/waypoint-type';


const getAvailableOffers = ({waypoint, dataBase} : {waypoint: Waypoint, dataBase: DataBase}) => dataBase.offersModel.getAvailableOffers(waypoint);
const getSelectedOffers = ({waypoint, dataBase} : {waypoint: Waypoint, dataBase: DataBase}) => dataBase.offersModel.getSelectedOffers(waypoint);

export {
  getAvailableOffers,
  getSelectedOffers,
};
