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
  #container: any;
  #handleDataChange: PointChange;
  #handleNewPointDestroy: EmptyFn;
  #handleFormClose: EmptyFn;
  #pointNewComponent: PointFormView | null = null;
  #models: Models;
  #point: Point;

  constructor({
    container,
    models,
    onDataChange,
    onNewPointDestroy,
    onFormClose,
  }: {
    container: HTMLUListElement;
    models: Models;
    onDataChange: PointChange;
    onNewPointDestroy: EmptyFn;
    onFormClose: EmptyFn;
  }) {
    this.#container = container;
    this.#models = models;
    this.#point = DEFAULT_POINT;
    this.#handleDataChange = onDataChange;
    this.#handleNewPointDestroy = onNewPointDestroy;
    this.#handleFormClose = onFormClose;
  }

  init() {
    this.#pointNewComponent = new PointFormView({
      point: this.#point,
      models: this.#models,
      isNewPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick,
      onFormClose: () => null,
    });

    render(this.#pointNewComponent, this.#container, 'afterbegin');

    document.addEventListener('keydown', this.#handleEscKeyDown);
  }

  destroy() {
    if (this.#pointNewComponent === null) {
      return;
    }

    this.#handleNewPointDestroy();
    this.#handleFormClose();
    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;

    document.removeEventListener('keydown', this.#handleEscKeyDown);
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
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #handleEscKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
