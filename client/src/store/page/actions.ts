import { action } from 'typesafe-actions';
import { ACTIONS_CONSTANT } from './constants';
import { THeader, TModal } from './types';

export const setHeaderAction = (
  header: THeader,
) => action(ACTIONS_CONSTANT.SET_HEADER, header);

export const setModalAction = (
  modal: TModal,
) => action(ACTIONS_CONSTANT.SET_MODAL, modal);
