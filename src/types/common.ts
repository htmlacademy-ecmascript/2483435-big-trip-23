import type { Point } from './point-type';
import type { Models } from '../model/create-models';
import type { UpdateType, UserAction } from '../const';

type PointData = { point: Point; models: Models };
type EmptyFn = () => void;
type PointChange = (actionType: UserAction, updateType: UpdateType, update: any) => void;

export type { PointData, EmptyFn, PointChange };
