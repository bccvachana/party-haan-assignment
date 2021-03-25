import store from 'store';
import {
  setHeaderAction,
} from './actions';
import { THeader } from './types';

export const setHeader = (header: THeader) => {
  store.dispatch(setHeaderAction(header));
};
