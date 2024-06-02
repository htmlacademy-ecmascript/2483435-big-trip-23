// import type { CamelizeObject, SnakeCaseObject } from './types-utils';

// const camelize = (str: string) => str.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
// const snakelize = (str: string) => str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);

// const createCaseChanger = (changer: (str: string) => string) => <0 extends object>(object: object): 0 =>
// Object.entries(object).reduce((acc, [key, value]) => {
//   acc[changer(key) as keyof 0] = value;
//   return acc;
// }, {} as 0);

// const camelizeObject: <0 extends object>(input: 0) => CamelizeObject<0> = createCaseChanger(camelize);

// const snakelizeObject: <0 extends object>(input: 0) => SnakeCaseObject<0> = createCaseChanger(snakelize);

// export { camelize, snakelize, camelizeObject, snakelizeObject };
