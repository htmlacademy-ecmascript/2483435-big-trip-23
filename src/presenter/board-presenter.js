import { SortView } from '../view/list-sort-view.js';
import { NewPointView } from '../view/new-point-view.js';
import { NewPointWithoutOffersView } from '../view/new-point-without-offers-view.js';
import { NewPointWithoutDestinationView } from '../view/new-point-without-destination-view.js';
import { PointContentView } from '../view/point-content-view.js';
import { ListView } from '../view/list-view.js';
import { render } from '../render.js';

export class BoardPresenter {
  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(new PointContentView(), this.boardContainer);
    render(new NewPointView(), this.boardContainer);
    render(new NewPointWithoutOffersView(), this.boardContainer);
    render(new NewPointWithoutDestinationView(), this.boardContainer);
    render(new ListView(), this.boardContainer);
  }
}
