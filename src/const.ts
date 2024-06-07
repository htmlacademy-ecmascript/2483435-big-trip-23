import type { Point, PointType } from './types/point-type';

const DEFAULT_POINT: Point = {
  id: '',
  basePrice: Number(''),
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};
const POINTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'] as const;
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'] as const;
const FILTER_TYPES = ['everything', 'future', 'present', 'past'] as const;

const pointSet = new Set(POINTS_TYPES);
const isValidPointType = (type: string): type is PointType => pointSet.has(type as PointType);
const enum UpdateType {
  /** Список меняется */
  MINOR,
  /** В пределах одной точки*/
  PATCH,
  /** Произошла инициализация */
  INIT,
}

const enum Message {
  LOADING,
  FAILED_LOAD,
  EMPTY,
}

const enum UserAction {
  UPDATE_POINT,
  ADD_POINT,
  DELETE_POINT,
}

const enum Mode {
  DEFAULT,
  EDITING,
}

const enum FormName {
  PRICE = 'event-price',
  TYPE = 'event-type',
  DESTINATION = 'event-destination',
}

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const AllowedPrice = {
  MIN: 0,
  MAX: 100_000,
};

export {
  POINTS_TYPES,
  SORT_TYPES,
  FILTER_TYPES,
  UserAction,
  UpdateType,
  isValidPointType,
  DEFAULT_POINT,
  TimeLimit,
  Message,
  AllowedPrice,
  Mode,
  FormName,
};
