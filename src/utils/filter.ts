import type { FilterType } from '../const';
import type { Point } from '../types/point-type';
import { isFuturePoints, isPresentPoints, isPastPoints } from './time/time-for-filters';

const filter: Record<FilterType, (points: Point[]) => Point[]> = {
  everything: (points) => points,
  future: (points) => points.filter((point) => isFuturePoints(point)),
  present: (points) => points.filter((point) => isPresentPoints(point)),
  past: (points) => points.filter((point) => isPastPoints(point)),
};

function generateFilter(points: Point[]) {
  return Object.entries(filter).map(([type, filterPoints]) => {
    const filteredPoints = filterPoints(points);

    return {
      type,
      count: filteredPoints.length,
      points: filteredPoints,
    };
  });
}

export type Filters = ReturnType<typeof generateFilter>;

export type Filter = {
  type: FilterType;
  count: number;
};

export { filter };
