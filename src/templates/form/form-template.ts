import type { DataBase } from '@presenter/main-presenter';
import type { State } from '../../types/state';
import { capitalLetter } from '../../utils/utils';
import { createDescriptionTemplate } from './description-template';
import { createDestinationsListTemplate } from './destinations-template';
import { createOffersTemplate } from './offers-template';
import { createPicturesTemplate } from './pictures-template';
import { createPointsTypesListTemplate } from './types-template';
import { pointDataForTemplate } from './point-data-for-template';
import he from 'he';

export const enum FormNames {
  Price = 'event-price',
  Type = 'event-type',
  Destination = 'event-destination',
}
export function getFormTemplate(data: State, dataBase: DataBase, isNewPoint: boolean) {
  const point = pointDataForTemplate(data, dataBase, isNewPoint);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="${FormNames.Destination}" value="${he.escape(capitalLetter(point.destinationName))}" list="destination-list-1" required>
      <datalist id="destination-list-1">

      ${createDestinationsListTemplate(point.destination, dataBase)}

      </datalist>
    </div>

  <div class="event__field-group  event__field-group--time">
  <label class="visually-hidden" for="event-start-time-1">From</label>
  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${he.escape(point.timeStart)}">
  &mdash;
  <label class="visually-hidden" for="event-end-time-1">To</label>
  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${he.escape(point.timeEnd)}">
  </div>

  <div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="${FormNames.Price}" value="${point.basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${point.cancelButton}</button>
    ${point.rollupButton}

    <span class="visually-hidden">Open event</span>
    </button>
    </header>
    <section class="event__details">

    ${createOffersTemplate(point.type, point.selectedOffers, dataBase)}

    ${createDescriptionTemplate(point.destination, dataBase)}

    ${createPicturesTemplate(point.destination, dataBase)}

    </section>
    </form>
    </li>
    `;
}
