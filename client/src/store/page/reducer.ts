import { ActionType } from 'typesafe-actions';
import {
  IHeader,
  IModal,
  IPageStore,
} from './types';
import * as actions from './actions';
import { ACTIONS_CONSTANT, initHeader, initModal } from './constants';

export type TPageActions = ActionType<typeof actions>;

const initState: IPageStore = {
  header: initHeader,
  modal: initModal,
};

export default (
  state: IPageStore = initState,
  action: TPageActions,
): IPageStore => {
  switch (action.type) {
    case ACTIONS_CONSTANT.SET_HEADER:
      return {
        ...state,
        header: {
          ...initHeader,
          ...action.payload as IHeader,
        },
      };
    case ACTIONS_CONSTANT.SET_MODAL:
      return {
        ...state,
        modal: action.payload as IModal,
      };
    default:
      return state;
  }
};
