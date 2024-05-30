import type { DataBase } from '@presenter/list';
import type { Point } from './point-type';

type PointData = { point: Point; dataBase: DataBase };
type EmptyFn = () => void;

export type { PointData, EmptyFn };
