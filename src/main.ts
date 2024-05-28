import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import FilterModel from './model/filter-model';
import NewEventButtonView from './view/header/new-event-button-view';
import { render } from './framework/render';
import PointsApiService from './service/point-api-service';

const headerContainer = document.querySelector('.trip-main')!;
const tripFilterContainer = headerContainer?.querySelector('.trip-controls__filters');

const AUTHORIZATION = 'Basic YQpmc1BXzUBKrA';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});

const destinationsModel = new DestinationsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});

const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});

const filterModel = new FilterModel();

const successfulLoad = () => {
  const newEventButtonComponent = new NewEventButtonView({ onClick: handleNewEventButtonClick });
  const dataBase = { destinationsModel, offersModel, pointsModel };
  const mainPresenter = new MainPresenter({ dataBase, filterModel, onNewPointDestroy: handleNewPointFormClose });
  const filterPresenter = new FilterPresenter({
    filterContainer: tripFilterContainer as HTMLElement,
    filterModel,
    pointsModel,
  });
  function handleNewPointFormClose() {
    newEventButtonComponent.element.disabled = false;
  }

  function handleNewEventButtonClick() {
    mainPresenter.createPoint();
    newEventButtonComponent.element.disabled = true;
  }

  filterPresenter.init();
  render(newEventButtonComponent, headerContainer, 'beforeend');
  mainPresenter.init();
};

Promise.all([pointsModel.init(), destinationsModel.init(), offersModel.init()]).finally(successfulLoad);
