import ListPresenter from './presenter/main-presenter';
import WaypointsModel from './model/waypoints-model';


const siteMainElement = document.querySelector<HTMLElement>('.trip-events');

const waypointsModel = new WaypointsModel();
const listPresenter = new ListPresenter({ listContainer: siteMainElement, waypointsModel });
listPresenter.init();

