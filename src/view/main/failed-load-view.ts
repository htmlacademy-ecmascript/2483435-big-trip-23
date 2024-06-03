import AbstractView from '../../framework/view/abstract-view';

const getTemplate = () => '<p class="trip-events__msg">Failed to load latest route information</p>';

export default class FailedLoadView extends AbstractView<HTMLTableSectionElement> {
  get template() {
    return getTemplate();
  }
}
