const capitalLetter = (letter: string) => letter.charAt(0).toUpperCase() + letter.slice(1);

const upperCaseLetter = (letter: string) => letter.toUpperCase();

const checkMatch = (stringA: string, stringB: string, property: string) => (stringA === stringB ? property : '');

export { capitalLetter, checkMatch, upperCaseLetter };
