import type { Point } from './point-type';
import type { Models } from '../model/create-models';

type PointData = { point: Point; models: Models };
type EmptyFn = () => void;

export type { PointData, EmptyFn };
