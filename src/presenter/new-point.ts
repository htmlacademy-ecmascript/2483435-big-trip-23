/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Point } from '../types/point-type';
import { render, remove } from '../framework/render';
import type { EmptyFn } from '../types/common';
import { UserAction } from '../const';
import { UpdateType } from '../const';
import { DEFAULT_POINT } from '../const';
import PointFormView from '../view/main/point-form';
import type { Models } from '../model/create-models';

type PointChange = (actionType: UserAction, updateType: UpdateType, update: any) => void;

export default class NewPointPresenter {
  #mainListContainer: any;
  #handleDataChange: PointChange;
  #handleDestroy: EmptyFn;
  #pointNewComponent: PointFormView | null = null;
  #models: Models;
  #point: Point;

  constructor({
    mainListContainer,
    models: models,
    onDataChange,
    onDestroy,
  }: {
    mainListContainer: HTMLUListElement;
    models: Models;
    onDataChange: PointChange;
    onDestroy: EmptyFn;
  }) {
    this.#mainListContainer = mainListContainer;
    this.#models = models;
    this.#point = DEFAULT_POINT;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    this.#point.id = crypto.randomUUID();
    if (this.#pointNewComponent !== null) {
      return;
    }

    this.#pointNewComponent = new PointFormView({
      point: this.#point,
      models: this.#models,
      isNewPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick,
      onFormClose: () => null,
    });
    render(this.#pointNewComponent, this.#mainListContainer, 'afterbegin');

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointNewComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
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

  #handleFormSubmit = (newPoint: Point) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MINOR, newPoint);
    // this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
