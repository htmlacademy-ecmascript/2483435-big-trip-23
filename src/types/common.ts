import type { Point } from './point-type';
import type { Models } from '../model/create-models';
import type { UpdateType, UserAction } from '../const';
import type { FormNames } from '../templates/form/form-template';
import type { pointDataForTemplate } from '../templates/form/point-data-for-templates';

type PointData = { point: Point; models: Models };
type EmptyFn = () => void;
type PointChange = (actionType: UserAction, updateType: UpdateType, update: Point) => void;
type DataToTemplate = ReturnType<typeof pointDataForTemplate>;

type PointForm = HTMLFormElement & {
  [FormNames.Price]: HTMLInputElement;
  [FormNames.Type]: RadioNodeList;
  [FormNames.Destination]: HTMLSelectElement;
};

export type { PointData, EmptyFn, PointChange, DataToTemplate, PointForm, Models };
