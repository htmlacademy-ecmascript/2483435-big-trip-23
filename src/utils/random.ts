/* eslint-disable @typescript-eslint/no-explicit-any */
const Default = {
  MIN: 0,
  MAX: 100,
};

export default class Randomizer {
  static getInteger = (min: number = Default.MIN, max: number = Default.MAX) => {
    const lower = Math.ceil(Math.min(min, max));
    const upper = Math.floor(Math.max(min, max));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  };

  static getArrayElement(items: any) {
    return items[Math.floor(Math.random() * items.length)];
  }

  static get boolean() {
    const value = this.getInteger(0, 1);
    return Boolean(value);
  }
}

export { Randomizer };
