/* eslint-disable @typescript-eslint/no-explicit-any */
import MainTripView from '../view/header/current-trip-view';
import SortingView from '../view/main/sorting-view';
import MainListContainer from '../view/main/main-list-container';
import { render, remove } from '../framework/render';
import type { Point } from '../types/point-type';
import { filter } from '../utils/filter';
import { UserAction } from '../const';
import type DestinationsModel from '../model/destinations-model';
import type OffersModel from '../model/offers-model';
import type PointsModel from '../model/points-model';
import PointPresenter from './point-presenter';
import type { SortType, FilterType } from '../const';
import { SORT_TYPES, UpdateType } from '../const';
import { priceSort, timeSort, daySort } from '../utils/sorting';
import type FilterModel from '../model/filter-model';
import NoPointView from '../view/main/no-point-view';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/main/loading-view';

export interface DataBase {
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
  pointsModel: PointsModel;
}

export default class ListPresenter {
  #tripMainContainer: HTMLDivElement;
  #tripEventsContainer: HTMLTableSectionElement;
  #loadingComponent = new LoadingView();
  #pointsModel: PointsModel;
  #filterModel: FilterModel | null = null;
  #dataBase: DataBase;
  #points: Point[];
  #mainListContainer: MainListContainer;
  #pointsPresenters = new Map<Point['id'], PointPresenter>();
  #sortComponent: SortingView;
  #noPointComponent: NoPointView | null = null;
  #currentSortType: SortType = SORT_TYPES[0];
  #filterType: FilterType = 'everything';
  #wasRendered: boolean = false;
  #newPointPresenter: NewPointPresenter;
  #isLoading = true;

  constructor({
    dataBase,
    filterModel,
    onNewPointDestroy: onNewPointDestroy,
  }: {
    dataBase: DataBase;
    filterModel: FilterModel;
    onNewPointDestroy: any;
  }) {
    this.#tripMainContainer = document.querySelector<HTMLDivElement>('.trip-main')!;
    this.#tripEventsContainer = document.querySelector<HTMLTableSectionElement>('.trip-events')!;
    this.#mainListContainer = new MainListContainer();

    this.#dataBase = dataBase;
    this.#pointsModel = this.#dataBase.pointsModel;
    this.#points = this.#dataBase.pointsModel.points;
    this.#sortComponent = new SortingView({ onSortTypeChange: this.#handleSortTypeChange });
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      mainListContainer: this.#mainListContainer.element,
      dataBase,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handlePointsModelEvent);
    this.#filterModel.addObserver(this.#onChange);
  }

  get points() {
    this.#filterType = this.#filterModel!.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case 'day':
        return filteredPoints.sort(daySort);
      case 'time':
        return filteredPoints.sort(timeSort);
      case 'price':
        return filteredPoints.sort(priceSort);
    }
    return filteredPoints;
  }

  init() {
    if (this.#wasRendered === false) {
      this.#renderPointsList();
      this.#wasRendered = true;
    } else {
      this.#renderPointsList();
    }

    this.#renderTripMain();
  }

  #renderPoint(pointData: { point: Point; dataBase: DataBase }) {
    const pointPresenter = new PointPresenter({
      mainListContainer: this.#mainListContainer.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(pointData);

    this.#pointsPresenters.set(pointData.point.id, pointPresenter);
  }

  #renderPoints(points: Point[]) {
    points.forEach((point) => {
      const pointData = { point, dataBase: this.#dataBase };
      this.#renderPoint(pointData);
    });
  }

  #handleModeChange = () => {
    this.#newPointPresenter!.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType: UserAction, updateType: UpdateType, updatePoint: any) => {
    switch (actionType) {
      case UserAction.updatePoint:
        this.#pointsModel.updatePoint(updateType, updatePoint);
        break;
      case UserAction.addPoint:
        this.#pointsModel.addPoint(updateType, updatePoint);
        break;
      case UserAction.deletePoint:
        this.#pointsModel.deletePoint(updateType, updatePoint);
        break;
    }
  };

  #onChange = () => {
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #handlePointsModelEvent = (updateType: UpdateType, point: Point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(point.id)!.init({
          point,
          dataBase: this.#dataBase,
        });
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointsList();
        break;
      default:
        this.#onChange();
        break;
    }
  };

  #handleSortTypeChange = (sortType: SortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderTripMain() {
    render(new MainTripView(), this.#tripMainContainer, 'afterbegin');
  }

  #renderSorting() {
    render(this.#sortComponent, this.#tripEventsContainer, 'afterbegin');
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView(this.#filterType);
    render(this.#noPointComponent, this.#tripEventsContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsContainer);
  }

  #clearPointsList() {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
  }

  createPoint() {
    this.#currentSortType = 'day';
    this.#filterModel!.setFilter(UpdateType.MAJOR, 'everything');
    this.#newPointPresenter!.init();
  }

  #renderPointsList() {
    render(this.#mainListContainer, this.#tripEventsContainer, 'beforeend');

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.points.length > 0) {
      this.#renderSorting();

      this.#renderPoints(this.points);
    } else {
      this.#renderNoPoints();
    }
  }
}
