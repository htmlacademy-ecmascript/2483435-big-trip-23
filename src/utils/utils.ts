/* eslint-disable @typescript-eslint/no-explicit-any */
const capitalLetter = (letter:string) => letter.charAt(0).toUpperCase() + letter.slice(1);

const checkMatch = (a:any, b:any, property: string) => a === b ? property : '';

export {capitalLetter, checkMatch};
