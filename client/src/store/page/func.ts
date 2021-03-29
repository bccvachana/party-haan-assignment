import store from 'store';
import {
  setHeaderAction,
  setModalAction,
  setIsPageLoadingAction,
} from './actions';
import { THeader, TModal } from './types';

export const setHeader = (
  header: THeader,
) => {
  store.dispatch(
    setHeaderAction(header),
  );
};

export const setModal = (
  modal: TModal,
) => {
  store.dispatch(
    setModalAction(modal),
  );
};

export const setIsPageLoading = (
  isPageLoading: boolean,
) => {
  store.dispatch(
    setIsPageLoadingAction(isPageLoading),
  );
};
