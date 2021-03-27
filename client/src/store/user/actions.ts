import { action } from 'typesafe-actions';
import { ACTIONS_CONSTANT } from './constants';
import { TUserStore } from './types';

export const setUserAction = (
  user: TUserStore,
) => action(ACTIONS_CONSTANT.SET_USER, user);
