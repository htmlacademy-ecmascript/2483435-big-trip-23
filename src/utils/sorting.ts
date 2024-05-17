/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import type { Waypoint } from '../types/waypoint-type';
import { findDuration } from './time';

const priceSort = (waypointA: Waypoint, waypointB: Waypoint) => waypointB.basePrice - waypointA.basePrice;

const timeSort = (waypointA: Waypoint, waypointB: Waypoint) => {
  const durationInSeconds = (time: any) => time[0] * 3600 + time[1] * 60 + time[2];

  const firstWaypoint = durationInSeconds(findDuration(waypointA.dateTo, waypointA.dateFrom));
  const secondWaypoint = durationInSeconds(findDuration(waypointB.dateTo, waypointB.dateFrom));

  return secondWaypoint - firstWaypoint;
};

function getWeightForNullDate(waypointA: Waypoint, waypointB: Waypoint) {
  if (waypointA.dateFrom === null && waypointB.dateFrom === null) {
    return 0;
  }

  if (waypointA.dateFrom === null) {
    return 1;
  }

  if (waypointB.dateFrom === null) {
    return -1;
  }

  return null;
}

function daySort(waypointA: Waypoint, waypointB: Waypoint) {
  const weight = getWeightForNullDate(waypointA, waypointB);

  return weight ?? dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom));
}

export { priceSort, timeSort, daySort };
