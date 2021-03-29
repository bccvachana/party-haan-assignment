import { ICommonObject } from 'types/common.type';
import { action } from 'typesafe-actions';
import { ACTIONS_CONSTANT } from './constants';
import { TUserStore } from './types';

export const setUserAction = (
  user: TUserStore,
) => action(ACTIONS_CONSTANT.SET_USER, user);

export const setPaticipatedPartyAction = (
  paticipatedParty: ICommonObject,
) => action(ACTIONS_CONSTANT.SET_PARTICIPATED_PARTY, paticipatedParty);
