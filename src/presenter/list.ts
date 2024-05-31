/* eslint-disable @typescript-eslint/no-explicit-any */
import MainListContainer from '../view/main/main-list-container';
import { render, remove } from '../framework/render';
import type { Point } from '../types/point-type';
import { filter } from '../utils/filter';
import { UserAction } from '../const';
import PointPresenter from './point';
import type { SortType, FilterType } from '../const';
import { SORT_TYPES, UpdateType } from '../const';
import ListEmptyView from '../view/main/list-empty';
import NewPointPresenter from './new-point';
import LoadingView from '../view/main/loading';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import type { EmptyFn } from '../types/common';
import type { Models } from '../model/create-models';
import type FilterModel from '../model/filters';
import type OffersModel from '../model/offers';
import type PointsModel from '../model/points';
import type DestinationsModel from '../model/destinations';
import type SortingModel from '../model/sorting';

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
  #points: Point[];
  #listContainer: MainListContainer;
  #pointsPresenters = new Map<Point['id'], PointPresenter>();
  #noPointComponent: ListEmptyView | null = null;
  #currentSortType: SortType = SORT_TYPES[0];
  #filterType: FilterType = 'everything';
  #newPointPresenter: NewPointPresenter;
  #isLoading = true;
  #destroyNewPoint: EmptyFn;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({ container, models }: { container: HTMLTableSectionElement; models: Models}) {
    this.#mainContainer = container;
    this.#listContainer = new MainListContainer();
    this.#models = models;
    this.#pointsModel = this.#models.pointsModel;
    this.#destinationsModel = this.#models.destinationsModel;
    this.#offersModel = this.#models.offersModel;
    this.#points = this.#models.pointsModel.points;

    this.#filterModel = this.#models.filtersModel;
    this.#sortingModel = this.#models.sortingModel;
    this.#destroyNewPoint = () => {
      // onNewPointDestroy();
      this.#renderNoPoints();
    };

    this.#newPointPresenter = new NewPointPresenter({
      mainListContainer: this.#listContainer.element,
      models,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#destroyNewPoint,
    });

    this.#pointsModel.addObserver(this.#handlePointsModelEvent);
    this.#filterModel.addObserver(this.#handleFilterChange)!;
    this.#sortingModel.addObserver(this.#handleSortTypeChange);
  }

  get points() {
    this.#filterType = this.#filterModel?.filter ?? 'everything';
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    return this.#sortingModel?.getSorteredPoints(filteredPoints, this.#currentSortType);
  }

  init() {
    Promise.all([this.#pointsModel.init(), this.#destinationsModel.init(), this.#offersModel.init()]).finally(this.#handleDataLoad);
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

  #renderPoints(points: Point[]) {
    points.forEach((point) => {
      const pointData = { point, models: this.#models };
      this.#renderPoint(pointData);
    });
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #onAddButtonClick = () => {
    this.createPoint();
    // this.#setAddButtonDisabled(true);
  };

  createPoint() {
    render(this.#listContainer, this.#mainContainer, 'beforeend');
    this.#filterType = 'everything';
    this.#handleFilterChange();
    this.#filterModel!.setFilter(UpdateType.MAJOR, 'everything');
    this.#newPointPresenter!.init();
    remove(this.#noPointComponent);
  }

  #handleFilterChange = () => {
    this.#clearPointsList();
    this.#sortingModel?.setSortType('day');
    this.#renderPointsList();
  };

  #handleViewAction = async (actionType: UserAction, updateType: UpdateType, updatePoint: any) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenters.get(updatePoint.id)?.setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, updatePoint);
        } catch (err) {
          this.#pointsPresenters.get(updatePoint.id)?.setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, updatePoint);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenters.get(updatePoint.id)?.setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, updatePoint);
        } catch (err) {
          this.#pointsPresenters.get(updatePoint.id)?.setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };


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

  #renderNoPoints() {
    this.#noPointComponent = new ListEmptyView(this.#filterType);
    render(this.#noPointComponent, this.#mainContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer);
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

  #handleDataLoad = () => {
    this.#isLoading = false;
    remove(this.#loadingComponent);
    this.#renderPointsList();
  };


  #handleSortTypeChange = () => {
    const sortType = this.#sortingModel?.type ?? SORT_TYPES[0];

    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderPointsList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points!.length > 0) {
      render(this.#listContainer, this.#mainContainer, 'beforeend');
      this.#renderPoints(this.points!);
    } else {
      this.#renderNoPoints();
    }
  }

}
