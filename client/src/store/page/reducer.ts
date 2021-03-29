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
  isPageLoading: true,
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
          title: '',
          noBackButton: false,
          noLogoutButton: false,
          noHeader: false,
          ...action.payload as IHeader,
        },
      };
    case ACTIONS_CONSTANT.SET_MODAL:
      return {
        ...state,
        modal: action.payload as IModal,
      };
    case ACTIONS_CONSTANT.SET_IS_PAGE_LOADING:
      return {
        ...state,
        isPageLoading: action.payload as boolean,
      };
    default:
      return state;
  }
};
