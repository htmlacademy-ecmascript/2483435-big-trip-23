import type { Point } from '../types/point-type';
import { render, remove } from '../framework/render';
import type { EmptyFn, PointChange } from '../types/common';
import { UserAction } from '../const';
import { UpdateType } from '../const';
import { DEFAULT_POINT } from '../const';
import PointFormView from '../view/main/point-form-view';
import type { Models } from '../model/create-models';

export default class NewPointPresenter {
  #container: HTMLElement;
  #dataChangeHandler: PointChange;
  #newPointDestroyHandler: EmptyFn;
  #formCloseHandler: EmptyFn;
  #pointNewComponent: PointFormView | null = null;
  #models: Models;
  #point: Point;

  constructor({
    container,
    models,
    dataChangeHandler: dataChangeHandler,
    newPointDestroyHandler: newPointDestroyHandler,
    formCloseHandler: formCloseHandler,
  }: {
    container: HTMLUListElement;
    models: Models;
    dataChangeHandler: PointChange;
    newPointDestroyHandler: EmptyFn;
    formCloseHandler: EmptyFn;
  }) {
    this.#container = container;
    this.#models = models;
    this.#point = DEFAULT_POINT;
    this.#dataChangeHandler = dataChangeHandler;
    this.#newPointDestroyHandler = newPointDestroyHandler;
    this.#formCloseHandler = formCloseHandler;
  }

  init() {
    this.#pointNewComponent = new PointFormView({
      point: this.#point,
      models: this.#models,
      isNewPoint: true,
      formSubmitHandler: this.#formSubmitHandler,
      deleteButtonClickHandler: this.#cancelButtonClickHandler,
      formCloseHandler: () => null,
    });

    render(this.#pointNewComponent, this.#container, 'afterbegin');

    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  destroy() {
    if (this.#pointNewComponent === null) {
      return;
    }

    this.#newPointDestroyHandler();
    this.#formCloseHandler();
    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;

    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  setSaving() {
    this.#pointNewComponent?.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointNewComponent?.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointNewComponent?.shake(resetFormState);
  }

  #formSubmitHandler = (newPoint: Point) => {
    this.#dataChangeHandler(UserAction.ADD_POINT, UpdateType.MINOR, newPoint);
  };

  #cancelButtonClickHandler = () => {
    this.destroy();
  };

  #escKeydownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
