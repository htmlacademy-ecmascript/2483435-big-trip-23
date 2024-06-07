import MessageView from '../view/main/message-view';
import { Message, SORT_TYPES, TimeLimit, UpdateType, UserAction } from '../const';
import { remove, render } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import type { Models } from '../model/create-models';
import type FilterModel from '../model/filter-model';
import type PointsModel from '../model/points-model';
import type SortingModel from '../model/sorting-model';
import type { EmptyFn, FilterType, SortType } from '../types/common';
import type { Point } from '../types/point-type';
import { filter } from '../utils/filter';
import ListView from '../view/main/list-view';
import NewPointPresenter from './new-point-presenter';
import PointPresenter from './point-presenter';

export default class ListPresenter {
  #mainContainer: HTMLTableSectionElement;
  #messageComponent: MessageView | null = null;
  #pointsModel: PointsModel;
  #filterModel: FilterModel;
  #sortingModel: SortingModel;
  #models: Models;
  #listContainer: ListView;
  #pointsPresenters = new Map<Point['id'], PointPresenter>();
  #currentSortType: SortType = SORT_TYPES[0];
  #currentFilter: FilterType = 'everything';
  #newPointPresenter: NewPointPresenter;
  #isLoading: boolean = true;
  #newPointDestroyHandler: EmptyFn;
  #formCloseHandler: EmptyFn;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({
    container,
    models,
    formCloseHandler: formCloseHandler,
  }: {
    container: HTMLTableSectionElement;
    models: Models;
    formCloseHandler: EmptyFn;
  }) {
    this.#mainContainer = container;
    this.#listContainer = new ListView();
    this.#models = models;
    this.#pointsModel = this.#models.pointsModel;
    this.#filterModel = this.#models.filtersModel;
    this.#sortingModel = this.#models.sortingModel;

    this.#newPointDestroyHandler = () => {
      if (this.points!.length === 0) {
        this.#renderMessage(Message.EMPTY, this.#currentFilter);
      }
    };

    this.#formCloseHandler = formCloseHandler;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#listContainer.element,
      models,
      dataChangeHandler: this.#viewActionHandler,
      newPointDestroyHandler: this.#newPointDestroyHandler,
      formCloseHandler: this.#formCloseHandler,
    });

    this.#pointsModel.addObserver(this.#pointsModelEventHandler);
    this.#filterModel.addObserver(this.#filterChangeHandler);
    this.#sortingModel.addObserver(this.#sortTypeChangeHandler);
  }

  get points() {
    this.#currentFilter = this.#filterModel?.filter ?? 'everything';
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#currentFilter](points);

    return this.#sortingModel?.getSortedPoints(filteredPoints, this.#currentSortType) ?? points;
  }

  init() {
    this.#renderMessage(Message.LOADING, this.#currentFilter);
  }

  #renderMessage(message: Message, currentFilter: FilterType) {
    remove(this.#messageComponent);
    this.#messageComponent = new MessageView(message, currentFilter);
    render(this.#messageComponent, this.#mainContainer);
  }

  #renderPointsList() {
    if (this.#isLoading) {
      return;
    }

    if (this.points.length > 0) {
      remove(this.#messageComponent);
      render(this.#listContainer, this.#mainContainer, 'beforeend');
      this.#renderPoints(this.points!);
    } else {
      this.#renderMessage(Message.EMPTY, this.#currentFilter);
    }
  }

  #clearPointsList() {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  #renderPoints(points: Point[]) {
    points.forEach((point) => {
      const pointData = { point, models: this.#models };
      this.#renderPoint(pointData);
    });
  }

  #renderPoint(pointData: { point: Point; models: Models }) {
    const pointPresenter = new PointPresenter({
      container: this.#listContainer.element,
      dataChangeHandler: this.#viewActionHandler,
      modeChangeHandler: this.#modeChangeHandler,
    });
    pointPresenter.init(pointData);

    this.#pointsPresenters.set(pointData.point.id, pointPresenter);
  }

  createPoint() {
    render(this.#listContainer, this.#mainContainer, 'beforeend');
    this.#currentFilter = 'everything';
    this.#filterChangeHandler();
    this.#filterModel.setFilter('everything');
    this.#newPointPresenter.init();
    remove(this.#messageComponent);
  }

  dataLoadHandler = (isSuccessful: boolean) => {
    this.#isLoading = false;
    remove(this.#messageComponent);
    if (isSuccessful === true) {
      this.#isLoading = false;
      this.#renderPointsList();
    } else {
      this.#isLoading = true;
      this.#renderMessage(Message.FAILED_LOAD, this.#currentFilter);
    }
  };

  #viewActionHandler = async (actionType: UserAction, updateType: UpdateType, updatedPoint: Point) => {
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

  #pointsModelEventHandler = (updateType: UpdateType, point: Point) => {
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
        this.#filterChangeHandler();
        break;
    }
  };

  #filterChangeHandler = () => {
    this.#currentFilter = this.#filterModel?.filter ?? 'everything';
    this.#sortingModel.setSortType('day');
    this.#currentSortType = 'day';
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #sortTypeChangeHandler = () => {
    const sortType = this.#sortingModel?.type ?? SORT_TYPES[0];

    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #modeChangeHandler = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };
}
