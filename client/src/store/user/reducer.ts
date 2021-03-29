import { ActionType } from 'typesafe-actions';
import { ICommonObject } from 'types/common.type';
import { TUserStore } from './types';
import * as actions from './actions';
import { ACTIONS_CONSTANT } from './constants';

export type TPageActions = ActionType<typeof actions>;

const initState: TUserStore = null;

export default (
  state: TUserStore = initState,
  action: TPageActions,
): TUserStore => {
  switch (action.type) {
    case ACTIONS_CONSTANT.SET_USER:
      return action.payload as TUserStore;
    case ACTIONS_CONSTANT.SET_PARTICIPATED_PARTY:
      return {
        ...state,
        paticipatedParty: action.payload as ICommonObject,
      };
    default:
      return state;
  }
};
