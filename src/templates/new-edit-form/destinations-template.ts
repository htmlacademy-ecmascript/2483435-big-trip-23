import type { Waypoint } from '../../types/waypoint-type';
import { checkMatch } from '../../utils/utils';
import type { DataBase } from '@presenter/main-presenter';
import { capitalLetter } from '../../utils/utils';

const correctName = (destination: Waypoint['destination'], dataBase: DataBase) => {
  const currentDestination = dataBase.destinationsModel.getDestinationByID(destination);
  return capitalLetter(currentDestination!.name);
};

const getTemplate = (currentName: string, name: string) =>
  `<option value="${currentName}"${checkMatch(name, currentName, 'checked')}></option>`;

const createDestinationsListTemplate = (destination: Waypoint['destination'], dataBase: DataBase) => {
  const currentDestination = dataBase.destinationsModel.getDestinationByID(destination) ?? '';
  const allDestinationsNames = dataBase.destinationsModel.allDestinationsNames;

  return allDestinationsNames
    .map((currentName: string): string => {
      if (typeof currentDestination === 'object' && currentDestination !== null) {
        return getTemplate(currentName, currentDestination.name);
      } else {
        return getTemplate(currentName, '');
      }
    })
    .join('');
};

export { createDestinationsListTemplate, correctName };
