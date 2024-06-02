import type { Point } from '../../types/point-type';
import type { Models } from '../../model/create-models';

const createDescriptionTemplate = (destination: Point['destination'], models: Models) => {
  const currentDestination = models.destinationsModel.getDestinationByID(destination) ?? '';

  if (currentDestination !== '') {
    const description = currentDestination.description;

    return description.length !== 0
      ? `
    <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    </section>`
      : '';
  } else {
    return '';
  }
};

export { createDescriptionTemplate };
