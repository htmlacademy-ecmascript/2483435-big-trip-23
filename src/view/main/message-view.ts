import { Message } from '../../const';
import AbstractView from '../../framework/view/abstract-view';
import type { FilterType } from '../../types/common';

const getMessage = (message: Message, filter: FilterType) => {
  switch (message) {
    case Message.LOADING:
      return 'Loading...';
    case Message.FAILED_LOAD:
      return 'Failed to load latest route information';
    case Message.EMPTY:
      switch (filter) {
        case 'everything':
          return 'Click New Event to create your first point';
        case 'future':
          return 'There are no future events now';
        case 'present':
          return 'There are no present events now';
        case 'past':
          return 'There are no past events now';
      }
  }
};

const getTemplate = (message: Message, filter: FilterType) => `<p class="trip-events__msg">${getMessage(message, filter)}</p>`;

export default class MessageView extends AbstractView<HTMLTableSectionElement> {
  #message: Message;
  #filter: FilterType;

  constructor(message: Message, filter: FilterType) {
    super();
    this.#message = message;
    this.#filter = filter;
  }

  get template() {
    return getTemplate(this.#message, this.#filter);
  }
}
