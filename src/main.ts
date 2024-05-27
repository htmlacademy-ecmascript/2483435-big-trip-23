import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model';
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
const pointsModel = new PointsModel(service);
const dataBase = { destinationsModel, offersModel, pointsModel: pointsModel };

const mainPresenter = new MainPresenter({ dataBase, filterModel, onNewPointDestroy: handleNewPointFormClose });
const filterPresenter = new FilterPresenter({
  filterContainer: tripFilterContainer as HTMLElement,
  filterModel: filterModel,
  pointsModel: pointsModel,
});

const newEventButtonComponent = new NewEventButtonView({ onClick: handleNewEventButtonClick });

function handleNewPointFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  mainPresenter.createPoint();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, headerContainer, 'beforeend');

mainPresenter.init();
filterPresenter.init();
