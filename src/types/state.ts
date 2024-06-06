import type { Prettify } from '../utils/types-utils';
import type { Point } from './point-type';

export type State = Prettify<
  Point & {
    selectedOffers: Set<string>;
    isDisabled: boolean;
    isSaving: boolean;
    isDeleting: boolean;
  }
>;
``