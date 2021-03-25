import { action } from 'typesafe-actions';
import { ACTIONS_CONSTANT } from './constants';
import { THeader } from './types';

export const setHeaderAction = (
  header: THeader,
) => action(ACTIONS_CONSTANT.SET_HEADER, header);
