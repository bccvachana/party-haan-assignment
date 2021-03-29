import { IModal, THeader } from './types';

export const ACTIONS_CONSTANT = {
  SET_HEADER: 'page/setHeader',
  SET_MODAL: 'page/setModal',
  SET_IS_PAGE_LOADING: 'page/setIsPageLoading',
};

export const initHeader: THeader = undefined;

export const initModal: IModal = {
  isModal: false,
};
