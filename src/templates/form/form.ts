import type { State } from '../../types/state';
import { capitalLetter } from '../../utils/utils';
import { createDescriptionTemplate } from './description';
import { createDestinationsListTemplate } from './destinations';
import { createOffersTemplate } from './offers';
import { createPicturesTemplate } from './pictures';
import { createPointsTypesListTemplate } from './types';
import { pointDataForTemplate } from './point-data';
import he from 'he';
import type { Models } from '../../model/create-models';

export const enum FormNames {
  Price = 'event-price',
  Type = 'event-type',
  Destination = 'event-destination',
}
export function getFormTemplate(data: State, models: Models, isNewPoint: boolean) {
  const point = pointDataForTemplate(data, models, isNewPoint);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post" disabled>
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${point.isDisabled ? 'disabled' : ''}>

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${createPointsTypesListTemplate(point.type)}

        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">

      <label class="event__label  event__type-output" for="event-destination-1">
      ${he.escape(capitalLetter(point.type))}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="${FormNames.Destination}" value="${he.escape(capitalLetter(point.destinationName))}" list="destination-list-1" required ${point.isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-1">

      ${createDestinationsListTemplate(point.destination, models)}

      </datalist>
    </div>

  <div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time">From</label>
  <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${he.escape(point.timeStart)}" ${point.isDisabled ? 'disabled' : ''}>
  &mdash;
  <label class="visually-hidden" for="event-end-time">To</label>
  <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${he.escape(point.timeEnd)}" ${point.isDisabled ? 'disabled' : ''}>
  </div>

  <div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="${FormNames.Price}" value="${point.basePrice}" ${point.isDisabled ? 'disabled' : ''}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${point.isDisabled ? 'disabled' : ''}>${point.isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset" ${point.isDisabled ? 'disabled' : ''}>${point.isDeleting ? 'Deleting...' : point.cancelButton}</button>
    ${point.startHiding}<button class="event__rollup-btn" type="button" ${point.isDisabled ? 'disabled' : ''}> ${point.endHiding}

    <span class="visually-hidden">Open event</span>
    </button>
    </header>
    <section class="event__details">

    ${createOffersTemplate(point, models)}

    ${createDescriptionTemplate(point.destination, models)}

    ${createPicturesTemplate(point.destination, models)}

    </section>
    </form>
    </li>
    `;
}
