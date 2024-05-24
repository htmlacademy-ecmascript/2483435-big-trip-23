import type { DataBase } from '@presenter/main-presenter';
import type { Waypoint } from '../../types/waypoint-type';

const createDescriptionTemplate = (destination: Waypoint['destination'], dataBase: DataBase) => {
  const currentDestination = dataBase.destinationsModel.getDestinationByID(destination) ?? '';

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
