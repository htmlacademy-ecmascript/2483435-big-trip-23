/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FilterType, SortType } from '../const';
import { SORT_TYPES, UpdateType, UserAction } from '../const';
import { remove, render } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import type { Models } from '../model/create-models';
import type DestinationsModel from '../model/destinations';
import type FilterModel from '../model/filter';
import type OffersModel from '../model/offers';
import type PointsModel from '../model/points';
import type SortingModel from '../model/sorting';
import type { EmptyFn } from '../types/common';
import type { Point } from '../types/point-type';
import { filter } from '../utils/filter';
import EmptyListView from '../view/main/empty-list';
import FailedLoadView from '../view/main/failed-load';
import listView from '../view/main/list';
import LoadingView from '../view/main/loading';
import NewPointPresenter from './new-point';
import PointPresenter from './point';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ListPresenter {
  #mainContainer: HTMLTableSectionElement;
  #loadingComponent = new LoadingView();
  #pointsModel: PointsModel;
  #destinationsModel: DestinationsModel;
  #offersModel: OffersModel;
  #filterModel: FilterModel | null = null;
  #sortingModel: SortingModel | null = null;
  #models: Models;
  #listContainer: listView;
  #pointsPresenters = new Map<Point['id'], PointPresenter>();
  #emptyList: EmptyListView | null = null;
  #failedLoad: FailedLoadView | null = null;
  #currentSorting: SortType = SORT_TYPES[0];
  #currentFilter: FilterType = 'everything';
  #newPointPresenter: NewPointPresenter;
  #isLoading = true;
  #destroyNewPoint: EmptyFn;
  #handleFormClose: EmptyFn;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({ container, models, onFormClose }: { container: HTMLTableSectionElement; models: Models; onFormClose: EmptyFn }) {
    this.#mainContainer = container;
    this.#listContainer = new listView();
    this.#models = models;
    this.#pointsModel = this.#models.pointsModel;
    this.#destinationsModel = this.#models.destinationsModel;
    this.#offersModel = this.#models.offersModel;
    this.#filterModel = this.#models.filtersModel;
    this.#sortingModel = this.#models.sortingModel;

    this.#destroyNewPoint = () => {
      this.#renderEmptyList();
    };
    this.#handleFormClose = onFormClose;

    this.#newPointPresenter = new NewPointPresenter({
      mainListContainer: this.#listContainer.element,
      models,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#destroyNewPoint,
      onFormClose: this.#handleFormClose,
    });

    this.#pointsModel.addObserver(this.#handlePointsModelEvent);
    this.#filterModel.addObserver(this.#handleFilterChange)!;
    this.#sortingModel.addObserver(this.#handleSortTypeChange);
  }

  init() {
    Promise.all([this.#pointsModel.init(), this.#destinationsModel.init(), this.#offersModel.init()])
      .then(() => this.#handleDataLoad(true))
      .catch(() => this.#handleDataLoad(false));
  }

  #handlePointsModelEvent = (updateType: UpdateType, point: Point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        {
          const presenter = this.#pointsPresenters.get(point.id);
          if (presenter) {
            presenter.init({
              point,
              models: this.#models,
            });
          }
        }
        break;
      default:
        this.#handleFilterChange();
        break;
    }
  };

  #handleFilterChange = () => {
    this.#currentFilter = this.#filterModel?.filter ?? 'everything';
    this.#clearPointsList();
    this.#renderPointsList();
    this.#sortingModel?.setSortType('day');
    this.#currentSorting = 'day';
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #clearPointsList() {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
    remove(this.#loadingComponent);

    if (this.#emptyList) {
      remove(this.#emptyList);
    }
  }

  #renderPointsList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points!.length > 0) {
      render(this.#listContainer, this.#mainContainer, 'beforeend');
      this.#renderPoints(this.points!);
    } else {
      this.#renderEmptyList();
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer);
  }

  #handleDataLoad = (isSuccessful: boolean) => {
    this.#isLoading = false;
    remove(this.#loadingComponent);
    if (isSuccessful === true) {
      this.#renderPointsList();
    } else {
      this.#renderFailedLoad();
    }
  };

  get points() {
    this.#currentFilter = this.#filterModel?.filter ?? 'everything';
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#currentFilter](points);

    return this.#sortingModel?.getSortedPoints(filteredPoints, this.#currentSorting);
  }

  #renderPoints(points: Point[]) {
    points.forEach((point) => {
      const pointData = { point, models: this.#models };
      this.#renderPoint(pointData);
    });
  }

  #renderPoint(pointData: { point: Point; models: Models }) {
    const pointPresenter = new PointPresenter({
      mainListContainer: this.#listContainer.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(pointData);

    this.#pointsPresenters.set(pointData.point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  createPoint() {
    render(this.#listContainer, this.#mainContainer, 'beforeend');
    this.#currentFilter = 'everything';
    this.#handleFilterChange();
    this.#filterModel!.setFilter('everything');
    this.#newPointPresenter!.init();
    remove(this.#emptyList);
  }

  #handleViewAction = async (actionType: UserAction, updateType: UpdateType, updatedPoint: any) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenters.get(updatedPoint.id)?.setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, updatedPoint);
        } catch (err) {
          this.#pointsPresenters.get(updatedPoint.id)?.setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, updatedPoint);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenters.get(updatedPoint.id)?.setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, updatedPoint);
        } catch (err) {
          this.#pointsPresenters.get(updatedPoint.id)?.setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #renderEmptyList() {
    this.#emptyList = new EmptyListView(this.#currentFilter);
    render(this.#emptyList, this.#mainContainer);
  }

  #renderFailedLoad() {
    this.#failedLoad = new FailedLoadView();
    render(this.#failedLoad, this.#mainContainer);
  }

  #handleSortTypeChange = () => {
    const sortType = this.#sortingModel?.type ?? SORT_TYPES[0];

    if (this.#currentSorting === sortType) {
      return;
    }
    this.#currentSorting = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };
}
