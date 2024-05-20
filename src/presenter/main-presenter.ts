import MainTripView from '../view/header/current-trip-view';
import FiltersView from '../view/header/filters-view';
import SortingView from '../view/main/sorting-view';
import ListEmptyView from '../view/main/list-empty-view';
import MainListContainer from '../view/main/main-list-container';
import { generateFilter } from '../utils/filter';
import { FILTER_TYPES } from '../const';
import Randomizer from '../utils/random';
import { render } from '../framework/render';
import type { Waypoint } from '../types/waypoint-type';
import type { Filters } from '../utils/filter';
import type { FilterType } from '../const';
import type DestinationsModel from '../model/destinations-model';
import type OffersModel from '../model/offers-model';
import type WaypointsModel from '../model/waypoints-model';
import WaypointPresenter from './waypoint-presenter';
import { updateItem } from '../utils/utils';
import type { SortType } from '../const';
import { SORT_TYPES } from '../const';
import { priceSort, timeSort, daySort } from '../utils/sorting';
export interface DataBase {
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
  waypointsModel: WaypointsModel;
}

export default class ListPresenter {
  #tripMainContainer: HTMLDivElement;
  #tripEventsContainer: HTMLTableSectionElement;
  #dataBase: DataBase;
  #waypoints: Waypoint[];
  #waypointsList: Waypoint[];
  #filters: Filters;
  #filtersType: FilterType;
  #mainListContainer: MainListContainer;
  #tripFilterContainer: HTMLDivElement;
  #waypointsPresenters = new Map<Waypoint['id'], WaypointPresenter>();
  #sortComponent: SortingView;
  #currentSortType: SortType = SORT_TYPES[0];
  #sourcedWaypoints: Waypoint[] = [];
  #wasRendered: boolean = false;

  constructor(dataBase: DataBase) {
    this.#tripMainContainer = document.querySelector<HTMLDivElement>('.trip-main')!;
    this.#tripFilterContainer = this.#tripMainContainer.querySelector('.trip-controls__filters')!;
    this.#tripEventsContainer = document.querySelector<HTMLTableSectionElement>('.trip-events')!;
    this.#mainListContainer = new MainListContainer();

    this.#dataBase = dataBase;
    this.#filters = generateFilter(this.#dataBase.waypointsModel.waypoints);
    this.#filtersType = Randomizer.getArrayElement(FILTER_TYPES);
    this.#waypoints = this.#dataBase.waypointsModel.waypoints;
    this.#waypointsList = [];
    this.#sortComponent = new SortingView({ onSortTypeChange: this.#handleSortTypeChange });
  }

  init() {
    this.#waypointsList = [...this.#waypoints];
    this.#sourcedWaypoints = [...this.#waypoints];

    if (this.#wasRendered === false) {
      this.#sortWaypoints(this.#currentSortType);
      this.#renderWaypointsList();
      this.#wasRendered = true;
    } else {
      this.#renderWaypointsList();
    }

    this.#renderTripMain();
    this.#renderFilters();
  }

  #renderWaypoint(waypointData: { waypoint: Waypoint; dataBase: DataBase }) {
    const waypointPresenter = new WaypointPresenter({
      mainListContainer: this.#mainListContainer.element,
      onDataChange: this.#handleWaypointChange,
      onModeChange: this.#handleModeChange,
    });
    waypointPresenter.init(waypointData);

    this.#waypointsPresenters.set(waypointData.waypoint.id, waypointPresenter);
  }

  #renderWaypoints() {
    for (const waypoint of this.#waypointsList) {
      const waypointData = { waypoint, dataBase: this.#dataBase };
      this.#renderWaypoint(waypointData);
    }
  }

  #handleModeChange = () => {
    this.#waypointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleWaypointChange = (updatedWaypoint: Waypoint) => {
    this.#waypointsList = updateItem(this.#waypointsList, updatedWaypoint);
    this.#sourcedWaypoints = updateItem(this.#sourcedWaypoints, updatedWaypoint);
    this.#waypointsPresenters.get(updatedWaypoint.id)?.init({
      waypoint: updatedWaypoint,
      dataBase: this.#dataBase,
    });
  };

  #handleSortTypeChange = (sortType: SortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#clearWaypointsList();
    this.#sortWaypoints(sortType);
    this.#renderWaypointsList();
  };

  #sortWaypoints(sortType: SortType) {
    switch (sortType) {
      case 'day':
        this.#waypointsList.sort(daySort);
        break;
      case 'time':
        this.#waypointsList.sort(timeSort);
        break;
      case 'price':
        this.#waypointsList.sort(priceSort);
        break;
      default:
        this.#waypointsList = [...this.#sourcedWaypoints];
    }

    this.#currentSortType = sortType;
  }

  #deleteWaypoint(waypoint: Waypoint) {
    this.#waypointsPresenters.get(waypoint.id)?.destroy();
    this.#waypointsPresenters.delete(waypoint.id);
  }

  #clearWaypointsList() {
    this.#waypointsPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointsPresenters.clear();
  }

  #renderTripMain() {
    render(new MainTripView(), this.#tripMainContainer, 'afterbegin');
  }

  #renderFilters() {
    render(new FiltersView({ filters: this.#filters, currentFilter: this.#filtersType }), this.#tripFilterContainer, 'beforeend');
  }

  #renderSorting() {
    render(this.#sortComponent, this.#tripEventsContainer, 'afterbegin');
  }

  #renderListEmpty() {
    render(new ListEmptyView(this.#filtersType), this.#tripEventsContainer);
  }

  #renderWaypointsList() {
    if (this.#waypoints.length > 0) {
      render(this.#mainListContainer, this.#tripEventsContainer, 'beforeend');

      this.#renderSorting();

      this.#renderWaypoints();
    } else {
      this.#renderListEmpty();
    }
  }
}
