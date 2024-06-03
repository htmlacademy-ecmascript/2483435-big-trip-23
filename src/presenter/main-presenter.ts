import type { Models } from '../model/create-models';
import { getPageElements } from '../page-elements';
import FilterPresenter from './filter-presenter';
import InfoPresenter from './info-presenter';
import ListPresenter from './list-presenter';
import NewButtonPresenter from './new-button-presenter';
import SortingPresenter from './sorting-presenter';

export default class MainPresenter {
  #elements = getPageElements();
  #models: Models;
  #newButton: NewButtonPresenter;
  #list: ListPresenter;
  #sorting: SortingPresenter | null = null;
  #info: InfoPresenter | null = null;

  constructor({ models }: { models: Models }) {
    this.#models = models;

    new FilterPresenter({ container: this.#elements.filters as HTMLElement, models: this.#models });
    this.#newButton = new NewButtonPresenter({ container: this.#elements.header, onNewButtonClick: this.#handleNewButton });
    this.#list = new ListPresenter({ container: this.#elements.events, models: this.#models, onFormClose: this.#handleCloseForm });
  }

  init() {
    this.#newButton.init();
    this.#list.init();
    Promise.all([this.#models.pointsModel.init(), this.#models.destinationsModel.init(), this.#models.offersModel.init()])
      .then(() => this.#handleDataLoad(true))
      .catch(() => this.#handleDataLoad(false));
  }

  #handleDataLoad = (isSuccessful: boolean) => {
    if (isSuccessful) {
      this.#sorting = new SortingPresenter({ container: this.#elements.events, models: this.#models });
      this.#info = new InfoPresenter({ container: this.#elements.header as HTMLElement, models: this.#models });

      this.#sorting.init();
      this.#info.init();
    }

    this.#newButton.handleDataLoad(isSuccessful);
    this.#list.handleDataLoad(isSuccessful);
  };

  #handleNewButton = () => {
    if (this.#list !== null) {
      this.#list.createPoint();
    }
  };

  #handleCloseForm = () => this.#newButton.activate();
}
