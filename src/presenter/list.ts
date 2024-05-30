/* eslint-disable @typescript-eslint/no-explicit-any */
import SortingView from '../view/main/sorting';
import MainListContainer from '../view/main/main-list-container';
import { render, remove } from '../framework/render';
import type { Point } from '../types/point-type';
import { filter } from '../utils/filter';
import { UserAction } from '../const';
import PointPresenter from './point';
import type { SortType, FilterType } from '../const';
import { SORT_TYPES, UpdateType } from '../const';
import { priceSort, timeSort, daySort } from '../utils/sorting';
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

export interface DataBase {
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
  pointsModel: PointsModel;
}

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
  #models: Models;
  #points: Point[];
  #mainListContainer: MainListContainer;
  #pointsPresenters = new Map<Point['id'], PointPresenter>();
  #sortComponent: SortingView | null = null;
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

  #addButton: HTMLButtonElement;

  constructor({ container, models, addButton }: { container: HTMLTableSectionElement; models: Models; addButton: any }) {
    this.#mainContainer = container;
    this.#mainListContainer = new MainListContainer();

    this.#models = models;
    this.#pointsModel = this.#models.pointsModel;
    this.#destinationsModel = this.#models.destinationsModel;
    this.#offersModel = this.#models.offersModel;
    this.#addButton = addButton;
    this.#points = this.#models.pointsModel.points;

    this.#filterModel = this.#models.filtersModel;
    this.#destroyNewPoint = () => {
      // onNewPointDestroy();
      this.#renderNoPoints();
    };

    this.#newPointPresenter = new NewPointPresenter({
      mainListContainer: this.#mainListContainer.element,
      models,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#destroyNewPoint,
    });

    this.#addButton.addEventListener('click', this.#onAddButtonClick);
    this.#pointsModel.addObserver(this.#handlePointsModelEvent);
    this.#filterModel.addObserver(this.#onChange)!;
  }

  get points() {
    this.#filterType = this.#filterModel?.filter ?? 'everything';
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
    Promise.all([this.#pointsModel.init(), this.#destinationsModel.init(), this.#offersModel.init()]).finally(this.#handleDataLoad);
    this.#setAddButtonDisabled(false);
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
      const pointData = { point, dataBase: this.#models };
      this.#renderPoint(pointData);
    });
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #onAddButtonClick = () => {
    this.#createPoint();
    this.#setAddButtonDisabled(true);
  };

  #createPoint() {
    render(this.#mainListContainer, this.#mainContainer, 'beforeend');
    this.#filterType = 'everything';
    this.#onChange();
    this.#filterModel!.setFilter(UpdateType.MAJOR, 'everything');
    this.#newPointPresenter!.init();
    remove(this.#noPointComponent);
  }

  #setAddButtonDisabled = (disabled: any) => {
    this.#addButton.disabled = disabled;
  };

  #onChange = () => {
    remove (this.#sortComponent);
    this.#currentSortType = 'day';
    this.#renderSorting();
    this.#clearPointsList();
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
              dataBase: this.#models,
            });
          }
        }
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

  #renderSorting() {
    this.#sortComponent = new SortingView({ onSortTypeChange: this.#handleSortTypeChange });
    render(this.#sortComponent, this.#mainContainer, 'afterbegin');
  }

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

  #renderPointsList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length > 0) {
      render(this.#mainListContainer, this.#mainContainer, 'beforeend');
      this.#renderPoints(this.points);
    } else {
      this.#renderNoPoints();
    }
  }
}
