import store from 'store';
import {
  setHeaderAction, setModalAction,
} from './actions';
import { THeader, TModal } from './types';

export const setHeader = (header: THeader) => {
  store.dispatch(setHeaderAction(header));
};

export const setModal = (modal: TModal) => {
  store.dispatch(setModalAction(modal));
};
