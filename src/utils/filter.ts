import { FilterType } from '../const';
import { isFutureWaypoints, isPresentWaypoints, isPastWaypoints } from '../utils/time';
import type { Waypoint } from '../types/waypoint-type';

const filter = {
  [FilterType.EVERYTHING]: (waypoints: Waypoint[]) => waypoints,
  [FilterType.FUTURE]: (waypoints: Waypoint[]) => waypoints.filter((waypoint) => isFutureWaypoints(waypoint.dateFrom)),
  [FilterType.PRESENT]: (waypoints: Waypoint[]) => waypoints.filter((waypoint) => isPresentWaypoints(waypoint.dateFrom, waypoint.dateTo)),
  [FilterType.PAST]: (waypoints: Waypoint[]) => waypoints.filter((waypoint) => isPastWaypoints(waypoint.dateTo)),
};

function generateFilter(waypoints: Waypoint[]): object[] {
  return Object.entries(filter).map(([filterType, filterWaypoints]) => ({
    type: filterType,
    count: filterWaypoints(waypoints).length,
  }));
}

export { generateFilter };
