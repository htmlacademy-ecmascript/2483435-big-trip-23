import type { DataBase } from '@presenter/list';
import { isValidPointType } from '../const';
import type AbstractStatefulView from '../framework/view/abstract-stateful-view';
import type { State } from '../types/state';

export type View = AbstractStatefulView<State> & {
  parseFormToState(): Partial<State>;
};

export function handleTypeChange(view: View, evt: Event) {
  const input = evt.target;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const selectedType = input.value;
  if (!isValidPointType(selectedType)) {
    return;
  }

  view._state.selectedOffers.clear();
  view.updateElement({
    ...view.parseFormToState(),
    offers: [],
    type: selectedType,
  });
}

export function handleDestinationChange(view: View, evt: Event, dataBase: DataBase) {
  const select = (evt.target as HTMLInputElement).value;

  if (!dataBase.destinationsModel.allDestinationsNames.includes(select)) {
    return;
  }

  const selectedDestination = dataBase.destinationsModel.getDestinationByName(select)?.id;
  evt.preventDefault();
  view.updateElement({
    destination: selectedDestination,
  });
}

export function handleSelectedOffers(view: View, evt: Event) {
  if (!(evt.target instanceof HTMLInputElement)) {
    return;
  }

  const selectedOffers = () => {
    const offers = view._state.selectedOffers;
    const event = evt.target as HTMLInputElement;
    const offerID = event.id.split('-').slice(2, -1).join('-');

    if (offers.has(offerID)) {
      offers.delete(offerID);
    } else {
      offers.add(offerID);
    }

    return offers;
  };

  view._setState({
    selectedOffers: selectedOffers(),
  });
}
