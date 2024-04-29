import BoardPresenter from './presenter/board-presenter';
import WaypointsModel from './model/waypoints-model';

const siteMainElement = document.querySelector('.trip-events');
const waypointsModel = new WaypointsModel();
const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement, waypointsModel });

boardPresenter.init();
