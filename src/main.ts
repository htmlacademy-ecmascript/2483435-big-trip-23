import ListPresenter from './presenter/main-presenter';
import WaypointsModel from './model/waypoints-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import MockService from './service/mock';

const siteMainElement = document.querySelector<HTMLElement>('.trip-events')!;


const service = new MockService();
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const waypointsModel = new WaypointsModel(service);
const listPresenter = new ListPresenter({ listContainer: siteMainElement, destinationsModel, offersModel, waypointsModel});
listPresenter.init();


console.log(service.points);
console.log(service.destinations);
console.log(service.offers);
