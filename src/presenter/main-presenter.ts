import MainTripView from '../view/header/current-trip-view';
import FiltersView from '../view/header/filters-view';
import SortingView from '../view/main/sorting-view';
import WaypointView from '../view/main/waypoint-view';
import ListEmptyView from '../view/main/list-empty-view';
import NewWaypointFormView from '../view/main/new-waypoint-form-view';
import MainListContainer from '../view/main/main-list-container';
import { generateFilter } from '../utils/filter';
import { FILTER_TYPES } from '../const';
import Randomizer from '../utils/random';
import { render, replace } from '../framework/render';
import type { Waypoint } from '../types/waypoint-type';
import type { Filters } from '../utils/filter';
import type { FilterType } from '../const';
import type DestinationsModel from '../model/destinations-model';
import type OffersModel from '../model/offers-model';
import type WaypointsModel from '../model/waypoints-model';
import WaypointPresenter from './waypoint-presenter';

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
  #filters: Filters;
  #filtersType: FilterType;
  #mainListContainer: MainListContainer;
  #tripFilterContainer: HTMLDivElement;

  constructor(dataBase: DataBase) {
    this.#tripMainContainer = document.querySelector<HTMLDivElement>('.trip-main')!;
    this.#tripFilterContainer = this.#tripMainContainer.querySelector('.trip-controls__filters')!;
    this.#tripEventsContainer = document.querySelector<HTMLTableSectionElement>('.trip-events')!;
    this.#mainListContainer = new MainListContainer();

    this.#dataBase = dataBase;
    this.#filters = generateFilter(this.#dataBase.waypointsModel.waypoints);
    this.#filtersType = Randomizer.getArrayElement(FILTER_TYPES);
    this.#waypoints = this.#dataBase.waypointsModel.waypoints;
  }

  init() {
    this.#renderFilters();
    this.#renderWaypointsList();
  }

  #renderTripMain() {
    render(new MainTripView(), this.#tripMainContainer, 'afterbegin');
  }

  #renderFilters() {
    render(new FiltersView({ filters: this.#filters, currentFilter: this.#filtersType }), this.#tripFilterContainer, 'beforeend');
  }

  #renderSorting() {
    render(new SortingView(), this.#tripEventsContainer, 'beforeend');
  }

  #renderWaypoint(waypointData: { waypoint: Waypoint; dataBase: DataBase }) {
    const waypointPresenter = new WaypointPresenter(this.#mainListContainer.element);
    waypointPresenter.init(waypointData);
  }

  #renderWaypoints() {
    for (const waypoint of this.#waypoints) {
      const waypointData = { waypoint, dataBase: this.#dataBase };
      this.#renderWaypoint(waypointData);
    }
  }

  #renderNewWaypoint(waypoint: Waypoint, dataBase: DataBase) {
    const waypointData = { waypoint, dataBase };

    const escKeyDownHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        switchToViewMode();
      }
    };

    const onEditClick = () => 'заглушка';
    const onFormSubmit = () => switchToViewMode();
    const onFormCancel = () => switchToViewMode();

    const waypointEditComponent = new NewWaypointFormView({
      waypointData,
      onFormSubmit: onFormSubmit,
      onFormCancel: onFormCancel,
    });

    const waypointComponent = new WaypointView({
      waypointData,
      onEditClick: onEditClick,
    });

    function switchToViewMode() {
      replace(waypointComponent, waypointEditComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(waypointEditComponent, this.#mainListContainer.element, 'afterbegin');
  }

  #renderListEmpty() {
    render(new ListEmptyView(this.#filtersType), this.#tripEventsContainer);
  }

  #renderListContainer() {
    render(this.#mainListContainer, this.#tripEventsContainer, 'beforeend');
  }

  #renderWaypointsList() {
    if (this.#waypoints.length > 0) {
      this.#renderTripMain();
      this.#renderSorting();
      this.#renderListContainer();
      this.#renderNewWaypoint(this.#waypoints[0], this.#dataBase);
      this.#renderWaypoints();
    } else {
      this.#renderListEmpty();
    }
  }
}
