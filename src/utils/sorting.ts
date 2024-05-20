import dayjs from 'dayjs';
import type { Waypoint } from '../types/waypoint-type';

const priceSort = (waypointA: Waypoint, waypointB: Waypoint) => waypointB.basePrice - waypointA.basePrice;

const getDuration = ({ dateFrom, dateTo }: Waypoint) => dayjs(dateTo).diff(dayjs(dateFrom));

const timeSort = (waypointA: Waypoint, waypointB: Waypoint) => getDuration(waypointB) - getDuration(waypointA);

const daySort = (waypointA: Waypoint, waypointB: Waypoint) => dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom));

export { priceSort, timeSort, daySort };
