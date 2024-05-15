/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Waypoint } from '../types/waypoint-type';
import dayjs from 'dayjs';


function getWeightForNullDate(waypointA:Waypoint, waypointB:Waypoint) {
  if (waypointA === null && waypointB === null) {
    return 0;
  }

  if (waypointA === null) {
    return 1;
  }

  if (waypointB === null) {
    return -1;
  }

  return null;
}

function daySort(waypointA:any, waypointB:any) {
  const weight = getWeightForNullDate(waypointA.dateFrom, waypointB.dateFrom);

  return weight ?? dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom));
}

function sortTaskDown(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
}

export {daySort, isTaskExpired, isTaskRepeating, isTaskExpiringToday, daySort as sortTaskUp, sortTaskDown};