/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Waypoint } from '../types/waypoint-type';
import { getDuration } from './time';

const compare = (a: any, b: any) => (a > b ? a : b);

const priceSort = (waypointA: any, waypointB: any) => compare(waypointA.price, waypointB.price);

const timeSort = (waypointA: Waypoint, waypointB: Waypoint) => {
  const a = getDuration(waypointA.dateFrom, waypointA.dateTo);
  const b = getDuration(waypointB.dateFrom, waypointB.dateTo);
  return compare(a, b);
};

export { priceSort, timeSort };
