import type { DataBase } from '@presenter/main-presenter';
import type { Waypoint } from './waypoint-type';

type WaypointData = { waypoint: Waypoint; dataBase: DataBase };
type EmptyFn = () => void;

export type { WaypointData, EmptyFn };
