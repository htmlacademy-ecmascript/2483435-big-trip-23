import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Point } from '../../types/point-type';

const now = dayjs();

const isFuturePoints = (point: Point) => dayjs(point.dateFrom).isAfter(now);
const isPresentPoints = (point: Point) => dayjs(point.dateFrom).isBefore(now) && dayjs(point.dateTo).isAfter(now);
const isPastPoints = (point: Point) => dayjs(point.dateTo).isBefore(now);
const isDatesEqual = (dateA: Dayjs, dateB: Dayjs) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'day');

export { isFuturePoints, isPresentPoints, isPastPoints, isDatesEqual };
