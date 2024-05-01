const capitalLetter = (letter: string) => letter.charAt(0).toUpperCase() + letter.slice(1);

const checkMatch = (a: string, b: string, property: string) => (a === b ? property : '');

export { capitalLetter, checkMatch };
