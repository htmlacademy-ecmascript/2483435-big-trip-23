import type { PointType } from './types/point-type';

const POINTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'] as const;

const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'] as const;
const FILTER_TYPES = ['everything', 'future', 'present', 'past'] as const;
type FilterType = (typeof FILTER_TYPES)[number];
type SortType = (typeof SORT_TYPES)[number];

const pointSet = new Set(POINTS_TYPES);
const isValidPointType = (type: string): type is PointType => pointSet.has(type as PointType);
const enum UpdateType {
  /** Перерисовывает всю страницу */
  MAJOR,
  /** Список меняется */
  MINOR,
  /** В пределах одной точки*/
  PATCH,
  INIT
}

const enum UserAction {
  UPDATE_POINT,
  ADD_POINT,
  DELETE_POINT,
}

const PointsEmptyMessages = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  present: 'There are no present events now',
  past: 'There are no past events now',
} as const satisfies Record<FilterType, string>;

export { POINTS_TYPES, SORT_TYPES, FILTER_TYPES, PointsEmptyMessages, SortType, FilterType, UserAction, UpdateType, isValidPointType };
