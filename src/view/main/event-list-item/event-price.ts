import { WayPoint } from '../../../types/way-point';
import View from '../../_abstract';

function getTemplate(event: WayPoint) {
  const { basePrice } = event;

  return `<p class="event__price">
  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
</p>`;
}

export default class EventPrice extends View<HTMLParagraphElement> {
  event: WayPoint;
  constructor(event: WayPoint) {
    super();
    this.event = event;
  }

  get template() {
    return getTemplate(this.event);
  }
}
