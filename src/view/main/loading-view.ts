import AbstractView from '../../framework/view/view';

const createLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
