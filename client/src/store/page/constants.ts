import { IHeader } from './types';

export const ACTIONS_CONSTANT = {
  SET_HEADER: 'page/setHeader',
};

export const initHeader: IHeader = {
  title: '',
  noBackButton: false,
  noLogoutButton: false,
  noHeader: false,
};
