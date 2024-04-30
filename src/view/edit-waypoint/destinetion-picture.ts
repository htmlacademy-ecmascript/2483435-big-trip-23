/* eslint-disable @typescript-eslint/no-explicit-any */
import View from '../_abstract';

function TEMPLATE(destinationPicture : any){
  const { src , description } = destinationPicture;

  return `<div class="event__photos-tape">
    <img class="event__photo" src="${src}" alt="${description}">
  </div>`;
}

export default class DestinationPicture extends View<Element> {
  destinationPicture:any;
  constructor({ destinationPicture }: { destinationPicture: any }) {
    super();
    this.destinationPicture = destinationPicture;
  }

  get template() {
    return TEMPLATE(this.destinationPicture);
  }
}
