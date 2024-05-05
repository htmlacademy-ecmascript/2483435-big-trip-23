import View from '../../_abstract';
import type { Waypoint } from '../../../types/way-point';

function getTemplate(event: Waypoint) {
  const { isFavorite } = event;

  const isFavoriteEvent = isFavorite ? 'event__favorite-btn--active' : '';

  return `<button class="event__favorite-btn ${isFavoriteEvent}" type="button">
  <span class="visually-hidden">Add to favorite</span>
  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
  </svg>
</button>`;
}

export default class Favorite extends View<HTMLButtonElement> {
  event: Waypoint;
  constructor(event: Waypoint) {
    super();
    this.event = event;
  }

  get template() {
    return getTemplate(this.event);
  }
}
