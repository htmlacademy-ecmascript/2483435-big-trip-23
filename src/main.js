import { RenderPosition } from './render.js';
import { CurrentTripView } from './view/current-trip-view.js';
import { FilterView } from './view/list-filter-view.js';
import { render } from './render.js';
import { BoardPresenter } from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement });

render(new CurrentTripView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterElement);

boardPresenter.init();
