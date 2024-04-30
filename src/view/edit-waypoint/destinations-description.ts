/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../_abstract';

function TEMPLATE(destination : any){
  const { description } = destination;

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  </div>
  </section>`;
}


export default class DestinationDescription extends View<HTMLTableSectionElement> {
  destination:any;
  constructor({ destination }: { destination: any }) {
    super();
    this.destination = destination;
  }

  get template() {
    return TEMPLATE(this.destination);
  }
}
