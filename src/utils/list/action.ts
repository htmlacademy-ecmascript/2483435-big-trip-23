/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UpdateType } from '../../const';
import { UserAction } from '../../const';
import UiBlocker from '../../framework/ui-blocker/ui-blocker';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const uiBlocker = new UiBlocker({
  lowerLimit: TimeLimit.LOWER_LIMIT,
  upperLimit: TimeLimit.UPPER_LIMIT,
});
export const viewAction = (presenter: any, model: any) => async (actionType: UserAction, updateType: UpdateType, updatePoint: any) => {
  uiBlocker.block();

  switch (actionType) {
    case UserAction.UPDATE_POINT:
      presenter.get(updatePoint.id)?.setSaving();
      try {
        await model.updatePoint(updateType, updatePoint);
      } catch (err) {
        presenter.get(updatePoint.id)?.setAborting();
      }
      break;
    case UserAction.ADD_POINT:
      presenter.setSaving();
      try {
        await model.addPoint(updateType, updatePoint);
      } catch (err) {
        presenter.setAborting();
      }
      break;
    case UserAction.DELETE_POINT:
      presenter.get(updatePoint.id)?.setDeleting();
      try {
        await model.deletePoint(updateType, updatePoint);
      } catch (err) {
        presenter.get(updatePoint.id)?.setAborting();
      }
      break;
  }
  uiBlocker.unblock();
};
