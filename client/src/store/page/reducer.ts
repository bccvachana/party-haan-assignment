import { ActionType } from 'typesafe-actions';
import {
  IPageStore, THeader,
} from './types';
import * as actions from './actions';
import { ACTIONS_CONSTANT, initHeader } from './constants';

export type TPageActions = ActionType<typeof actions>;

const initState: IPageStore = {
  header: initHeader,
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
          ...action.payload as THeader,
        },
      };
    default:
      return state;
  }
};
