import { IHeader, IModal } from './types';

export const ACTIONS_CONSTANT = {
  SET_HEADER: 'page/setHeader',
  SET_MODAL: 'page/setModal',
};

export const initHeader: IHeader = {
  title: '',
  noBackButton: false,
  noLogoutButton: false,
  noHeader: false,
};

export const initModal: IModal = {
  isModal: false,
};
