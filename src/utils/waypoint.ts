import type { Waypoint } from '../types/waypoint-type';

const equalWaypoints = (waypointA: Waypoint, waypointB: Waypoint) => {
  const pointA = { ...waypointA };
  const pointB = { ...waypointB };
  pointA.id = '0';
  pointB.id = '0';

  const pointAString = JSON.stringify(pointA);
  const pointBString = JSON.stringify(pointB);

  return pointAString !== pointBString;
};

export const isSameWaypoints = (waypoints: Waypoint[], waypointB: Waypoint) =>
  waypoints.every((waypoint: Waypoint) => equalWaypoints(waypoint, waypointB));
