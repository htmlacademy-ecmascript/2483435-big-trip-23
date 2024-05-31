import type { Models } from '../../model/create-models';
import type { Point } from '../../types/point-type';
import { checkMatch } from '../../utils/utils';
import { capitalLetter } from '../../utils/utils';
import he from 'he';

const correctName = (destination: Point['destination'], models: Models) => {
  const currentDestination = models.destinationsModel.getDestinationByID(destination);
  if (currentDestination) {
    return capitalLetter(currentDestination.name);
  } else {
    throw new Error('Invalid destination');
  }
};

const getOptions = (currentName: string, name: string) =>
  `<option value="${he.escape(currentName)}"${checkMatch(name, currentName, 'checked')}></option>`;

const createDestinationsListTemplate = (destination: Point['destination'], models: Models) => {
  const currentDestination = models.destinationsModel.getDestinationByID(destination) ?? '';
  const allDestinationsNames = models.destinationsModel.allDestinationsNames;

  return allDestinationsNames
    .map((currentName: string): string => {
      if (typeof currentDestination === 'object' && currentDestination !== null) {
        return getOptions(currentName, currentDestination.name);
      } else {
        return getOptions(currentName, '');
      }
    })
    .join('');
};

export { createDestinationsListTemplate, correctName };
