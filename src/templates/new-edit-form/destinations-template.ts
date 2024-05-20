import type { Waypoint } from '../../types/waypoint-type';
import { checkMatch } from '../../utils/utils';
import type { DataBase } from '@presenter/main-presenter';
import { capitalLetter } from '../../utils/utils';

const getDestination = (destination: Waypoint['destination'], dataBase: DataBase) =>
  Array.from(dataBase.destinationsModel.destinations).find((item) => item.id === destination);

const correctName = (destination: Waypoint['destination'], dataBase: DataBase) => {
  const currentDestination = getDestination(destination, dataBase);
  return capitalLetter(currentDestination!.name);
};

const getTemplate = (currentName: string, name: string) =>
  `<option value="${currentName}"${checkMatch(name, currentName, 'checked')}></option>`;

const createDestinationsListTemplate = (destination: Waypoint['destination'], dataBase: DataBase) => {
  const currentDestination = getDestination(destination, dataBase);
  const allDestinationsNames = dataBase.destinationsModel.allDestinationsNames;

  allDestinationsNames.map((currentName: string): string => getTemplate(currentName, currentDestination!.name)).join('');
};

export { createDestinationsListTemplate, correctName, getDestination };
