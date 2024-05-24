/* eslint-disable @typescript-eslint/no-explicit-any */
import MainTripView from '../view/header/current-trip-view';
import SortingView from '../view/main/sorting-view';
import MainListContainer from '../view/main/main-list-container';
import { render, remove } from '../framework/render';
import type { Waypoint } from '../types/waypoint-type';
import { filter } from '../utils/filter';
import { UserAction } from '../const';
import type DestinationsModel from '../model/destinations-model';
import type OffersModel from '../model/offers-model';
import type WaypointsModel from '../model/waypoints-model';
import WaypointPresenter from './waypoint-presenter';
import type { SortType, FilterType } from '../const';
import { SORT_TYPES, UpdateType } from '../const';
import { priceSort, timeSort, daySort } from '../utils/sorting';
import type FilterModel from '../model/filter-model';
import NoWaypointView from '../view/main/no-waypoint-view';
import NewWaypointPresenter from './new-waypoint-presenter';
import { DEFAULT_WAYPOINT } from '../mock/const';

export interface DataBase {
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
  waypointsModel: WaypointsModel;
}

export default class ListPresenter {
  #tripMainContainer: HTMLDivElement;
  #tripEventsContainer: HTMLTableSectionElement;
  #waypointsModel: WaypointsModel;
  #filterModel: FilterModel | null = null;
  #dataBase: DataBase;
  #waypoints: Waypoint[];
  #mainListContainer: MainListContainer;
  #waypointsPresenters = new Map<Waypoint['id'], WaypointPresenter>();
  #sortComponent: SortingView;
  #noWaypointComponent: NoWaypointView | null = null;
  #currentSortType: SortType = SORT_TYPES[0];
  #filterType: FilterType = 'everything';
  #wasRendered: boolean = false;
  #newWaypointPresenter: NewWaypointPresenter;

  constructor({
    dataBase,
    filterModel,
    onNewWaypointDestroy,
  }: {
    dataBase: DataBase;
    filterModel: FilterModel;
    onNewWaypointDestroy: any;
  }) {
    this.#tripMainContainer = document.querySelector<HTMLDivElement>('.trip-main')!;
    this.#tripEventsContainer = document.querySelector<HTMLTableSectionElement>('.trip-events')!;
    this.#mainListContainer = new MainListContainer();

    this.#dataBase = dataBase;
    this.#waypointsModel = this.#dataBase.waypointsModel;
    this.#waypoints = this.#dataBase.waypointsModel.waypoints;
    this.#sortComponent = new SortingView({ onSortTypeChange: this.#handleSortTypeChange });
    this.#filterModel = filterModel;

    this.#newWaypointPresenter = new NewWaypointPresenter({
      mainListContainer: this.#mainListContainer.element,
      waypoint: DEFAULT_WAYPOINT,
      dataBase,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewWaypointDestroy,
    });

    this.#waypointsModel.addObserver(this.#handleWaypointsModelEvent);
    this.#filterModel.addObserver(this.#onChange);
  }

  get waypoints() {
    this.#filterType = this.#filterModel!.filter;
    const waypoints = this.#waypointsModel.waypoints;
    const filteredWaypoints = filter[this.#filterType](waypoints);

    switch (this.#currentSortType) {
      case 'day':
        return filteredWaypoints.sort(daySort);
      case 'time':
        return filteredWaypoints.sort(timeSort);
      case 'price':
        return filteredWaypoints.sort(priceSort);
    }
    return filteredWaypoints;
  }

  init() {
    if (this.#wasRendered === false) {
      this.#renderWaypointsList();
      this.#wasRendered = true;
    } else {
      this.#renderWaypointsList();
    }

    this.#renderTripMain();
  }

  #renderWaypoint(waypointData: { waypoint: Waypoint; dataBase: DataBase }) {
    const waypointPresenter = new WaypointPresenter({
      mainListContainer: this.#mainListContainer.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    waypointPresenter.init(waypointData);

    this.#waypointsPresenters.set(waypointData.waypoint.id, waypointPresenter);
  }

  #renderWaypoints(waypoints: Waypoint[]) {
    waypoints.forEach((waypoint) => {
      const waypointData = { waypoint, dataBase: this.#dataBase };
      this.#renderWaypoint(waypointData);
    });
  }

  #handleModeChange = () => {
    this.#newWaypointPresenter!.destroy();
    this.#waypointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType: UserAction, updateType: UpdateType, updateWaypoint: any) => {
    switch (actionType) {
      case UserAction.updateWaypoint:
        this.#waypointsModel.updateWaypoint(updateType, updateWaypoint);
        break;
      case UserAction.addWaypoint:
        this.#waypointsModel.addWaypoint(updateType, updateWaypoint);
        break;
      case UserAction.deleteWaypoint:
        this.#waypointsModel.deleteWaypoint(updateType, updateWaypoint);
        break;
    }
  };

  #onChange = () => {
    this.#clearWaypointsList();
    this.#renderWaypointsList();
  };

  #handleWaypointsModelEvent = (updateType: UpdateType, waypoint: Waypoint) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointsPresenters.get(waypoint.id)!.init({
          waypoint,
          dataBase: this.#dataBase,
        });
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
    this.#clearWaypointsList();
    this.#renderWaypointsList();
  };

  #renderTripMain() {
    render(new MainTripView(), this.#tripMainContainer, 'afterbegin');
  }

  #renderSorting() {
    render(this.#sortComponent, this.#tripEventsContainer, 'afterbegin');
  }

  #renderNoWaypoint() {
    this.#noWaypointComponent = new NoWaypointView(this.#filterType);
    render(this.#noWaypointComponent, this.#tripEventsContainer);
  }

  #clearWaypointsList() {
    this.#newWaypointPresenter.destroy();
    this.#waypointsPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointsPresenters.clear();

    if (this.#noWaypointComponent) {
      remove(this.#noWaypointComponent);
    }
  }

  createWaypoint() {
    this.#currentSortType = 'day';
    this.#filterModel!.setFilter(UpdateType.MAJOR, 'everything');
    this.#newWaypointPresenter!.init();
  }

  #renderWaypointsList() {
    render(this.#mainListContainer, this.#tripEventsContainer, 'beforeend');

    if (this.waypoints.length > 0) {
      this.#renderSorting();

      this.#renderWaypoints(this.waypoints);
    } else {
      this.#renderNoWaypoint();
    }
  }
}
