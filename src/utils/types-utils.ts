import type { Dayjs } from 'dayjs';

type CamelCase<T extends string> = T extends `${infer Head}_${infer Tail}`
  ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
  : Lowercase<T>;

type CamelizeObject<T extends object> = {
  [K in keyof T & string as CamelCase<K>]: T[K];
};


type SnakeCase<T> = T extends `${infer First}${infer Rest}`
? First extends Uppercase<First>
? `_${Lowercase<First>}${SnakeCase<Rest>}`
: `${First}${SnakeCase<Rest>}`
: '';

type SnakeCaseObject<T extends object> = {
  [K in keyof T & string as SnakeCase<K>]: T[K];
};

type WithDate<T extends object> = {
  [K in keyof T]: K extends `date${string}` ? Dayjs : T[K];
};

type Prettify<T> = {
  [K in keyof T]: T[K];
};

export type { CamelizeObject, WithDate, Prettify, SnakeCaseObject };

