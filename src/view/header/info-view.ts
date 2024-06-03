import AbstractView from '../../framework/view/abstract-view';
import type { Models } from '../../model/create-models';
import type { Point } from '../../types/point-type';
import { route } from '../../templates/info/route-template';
import { date } from '../../templates/info/date-template';
import { cost } from '../../templates/info/cost-template';

const getTemplate = (models: Models) => `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${route(models)}</h1>

              <p class="trip-info__dates">${date(models)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost(models)}</span>
            </p>
          </section>`;

export default class InfoView extends AbstractView<HTMLTableSectionElement> {
  #models: Models;

  constructor({ models }: { points: Point[]; models: Models }) {
    super();

    this.#models = models;
  }

  get template() {
    return getTemplate(this.#models);
  }
}
