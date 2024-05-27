import dayjs from 'dayjs';
import type { Point } from '../types/point-type';

const priceSort = (pointA: Point, pointB: Point) => pointB.basePrice - pointA.basePrice;

const getDuration = ({ dateFrom, dateTo }: Point) => dayjs(dateTo).diff(dayjs(dateFrom));

const timeSort = (pointA: Point, pointB: Point) => getDuration(pointB) - getDuration(pointA);

const daySort = (pointA: Point, pointB: Point) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export { priceSort, timeSort, daySort };
