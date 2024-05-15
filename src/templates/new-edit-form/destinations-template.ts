import { checkMatch } from '../../utils/utils';

const getTemplate = (currentName: string, name: string) =>
  `<option value="${currentName}"${checkMatch(name, currentName, 'checked')}></option>`;

const createDestinationsListTemplate = (name: string, allDestinationsNames: string[]) =>
  allDestinationsNames.map((currentName: string): string => getTemplate(currentName, name)).join('');

export { createDestinationsListTemplate };
