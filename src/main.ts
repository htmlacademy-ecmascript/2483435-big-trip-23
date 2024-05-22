import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';
import WaypointsModel from './model/waypoints-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import FilterModel from './model/filter-model';
import MockService from './service/mock';
import NewEventButtonView from './view/header/new-event-button-view';
import { render } from './framework/render';

const headerContainer = document.querySelector('.trip-main')!;
const tripFilterContainer = headerContainer.querySelector('.trip-controls__filters')!;

const service = new MockService();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const waypointsModel = new WaypointsModel(service);
const dataBase = { destinationsModel, offersModel, waypointsModel };

const mainPresenter = new MainPresenter({ dataBase, filterModel, onNewWaypointDestroy: handleNewWaypointFormClose });
const filterPresenter = new FilterPresenter({
  filterContainer: tripFilterContainer as HTMLElement,
  filterModel: filterModel,
  waypointsModel,
});

const newEventButtonComponent = new NewEventButtonView({ onClick: handleNewEventButtonClick });

function handleNewWaypointFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  mainPresenter.createWaypoint();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, headerContainer, 'beforeend');

mainPresenter.init();
filterPresenter.init();
