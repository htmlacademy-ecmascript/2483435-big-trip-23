import type { Destination } from '../../types/destination-type';

const createDescriptionTemplate = (description: Destination['description']) =>
  description.length !== 0
    ? `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    </section>`
    : '';

export { createDescriptionTemplate };
