import type { Waypoint } from '../types/waypoint-type';


const capitalLetter = (letter: string) => letter.charAt(0).toUpperCase() + letter.slice(1);

const upperCaseLetter = (letter: string) => letter.toUpperCase();

const checkMatch = (a: string, b: string, property: string) => (a === b ? property : '');

function updateItem(items: Waypoint[], update: Waypoint) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { capitalLetter, checkMatch, upperCaseLetter, updateItem };
