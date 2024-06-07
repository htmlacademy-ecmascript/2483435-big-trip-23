import type { Point } from './point-type';
import type { Models } from '../model/create-models';
import type { FILTER_TYPES, SORT_TYPES, UpdateType, UserAction } from '../const';
import type { FormName } from '../const';
import type { pointDataForTemplate } from '../templates/form/point-data-for-templates';

type EmptyFn = () => void;
type SortType = (typeof SORT_TYPES)[number];
type FilterType = (typeof FILTER_TYPES)[number];
type PointData = { point: Point; models: Models };
type DataToTemplate = ReturnType<typeof pointDataForTemplate>;
type PointChange = (actionType: UserAction, updateType: UpdateType, update: Point) => void;

type PointForm = HTMLFormElement & {
  [FormName.PRICE]: HTMLInputElement;
  [FormName.TYPE]: RadioNodeList;
  [FormName.DESTINATION]: HTMLSelectElement;
};

export type { PointData, EmptyFn, PointChange, DataToTemplate, PointForm, Models, FilterType, SortType };
