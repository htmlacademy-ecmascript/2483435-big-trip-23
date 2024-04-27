import BoardPresenter from './presenter/board-presenter.js';
import WaypointsModel from './model/waypoints-model.js';

const siteMainElement = document.querySelector('.trip-events');
const waypointsModel = new WaypointsModel();
const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement, waypointsModel });

boardPresenter.init();
