/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-multi-spaces */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MainTripView from '../view/header/current-trip-view';
import FiltersView from '../view/header/filters-view';
import SortingView from '../view/main/sorting-view';
import WaypointView from '../view/main/waypoint-view';
import EditWaypointFormView from '../view/main/edit-waypoint-form-view';
import ListEmptyView from '../view/main/list-empty-view';
// import NewWaypointFormView from '../view/main/new-waypoint-form-view';
import { render, replace } from '../framework/render';
import type { Waypoint } from '../types/waypoint-type';
import { generateFilter } from '../utils/filter';
import { FilterType } from '../const';
import Randomizer from '../utils/random';

export default class ListPresenter {
  #tripMain: HTMLDivElement;
  #tripFilters: HTMLDivElement;
  #pageMain: any;
  #tripEvents: HTMLTableSectionElement;
  #waypointsList: HTMLUListElement;
  #dataBase: any;
  #waypoints: Waypoint[];
  #filters: any;
  #filtersTypes: any;

  constructor(dataBase: any) {
    this.#tripMain = document.querySelector('.trip-main')!;
    this.#tripFilters = document.querySelector('.trip-controls__filters')!;
    this.#pageMain = document.querySelector('.page-main');
    this.#tripEvents = this.#pageMain.querySelector('.trip-events');

    this.#waypointsList = document.createElement('ul');
    this.#waypointsList.classList.add('trip-events__list');
    this.#tripEvents.appendChild(this.#waypointsList);

    this.#dataBase = dataBase;
    this.#filters = generateFilter(this.#dataBase.waypointsModel.waypoints);
    this.#filtersTypes = Randomizer.getArrayElement(Object.values(FilterType));
    this.#waypoints = this.#dataBase.waypointsModel.waypoints;
  }

  init() {
    this.#renderFilters();
    this.#renderWaypointsList();
  }

  #renderTripMain() {
    render(new MainTripView(), this.#tripMain, 'afterbegin');
  }

  #renderFilters() {
    render(new FiltersView({ filters: this.#filters, currentFilter: this.#filtersTypes }), this.#tripFilters);
  }

  #renderSorting() {
    render(new SortingView(), this.#tripEvents, 'afterbegin');
  }

  #renderWaypoint(waypointData: any) {
    const escKeyDownHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        switchToViewMode();
      }
    };

    const onEditClick = () => switchToEditMode();
    const onFormSubmit = () => switchToViewMode();
    const onFormCancel = () => switchToViewMode();

    const waypointComponent = new WaypointView({
      waypointData,
      onEditClick: onEditClick,
    });

    const waypointEditComponent = new EditWaypointFormView({
      waypointData,
      onFormSubmit: onFormSubmit,
      onFormCancel: onFormCancel,
    });

    function switchToEditMode() {
      replace(waypointEditComponent, waypointComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function switchToViewMode() {
      replace(waypointComponent, waypointEditComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(waypointComponent, this.#waypointsList);
  }

  #renderWaypoints() {
    for (const waypoint of this.#waypoints) {
      const waypointData = { waypoint, dataBase: this.#dataBase };
      this.#renderWaypoint(waypointData);
    }
  }

  #renderListEmpty() {
    render(new ListEmptyView(this.#filtersTypes), this.#waypointsList);
  }

  #renderWaypointsList() {
    if (this.#waypoints.length > 0) {
      this.#renderSorting();
      this.#renderTripMain();
      this.#renderWaypoints();
    } else {
      this.#renderListEmpty();
    }
  }
}
