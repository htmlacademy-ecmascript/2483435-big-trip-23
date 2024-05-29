import type { Point } from '../../types/point-type';
import { checkMatch } from '../../utils/utils';
import type { DataBase } from '@presenter/main-presenter';
import { capitalLetter } from '../../utils/utils';
import he from 'he';

const correctName = (destination: Point['destination'], dataBase: DataBase) => {
  const currentDestination = dataBase.destinationsModel.getDestinationByID(destination);
  if (currentDestination) {
    return capitalLetter(currentDestination.name);
  } else {
    throw new Error('Invalid destination');
  }
};

const getOptions = (currentName: string, name: string) =>
  `<option value="${he.escape(currentName)}"${checkMatch(name, currentName, 'checked')}></option>`;

const createDestinationsListTemplate = (destination: Point['destination'], dataBase: DataBase) => {
  const currentDestination = dataBase.destinationsModel.getDestinationByID(destination) ?? '';
  const allDestinationsNames = dataBase.destinationsModel.allDestinationsNames;

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
