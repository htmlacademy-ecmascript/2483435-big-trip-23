import MainPresenter from './presenter/main-presenter';
import WaypointsModel from './model/waypoints-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import MockService from './service/mock';

const siteMainElement = document.querySelector<HTMLElement>('.trip-events')!;

const service = new MockService();
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const waypointsModel = new WaypointsModel(service);
const mainPresenter = new MainPresenter({ listContainer: siteMainElement, destinationsModel, offersModel, waypointsModel });
mainPresenter.init();
