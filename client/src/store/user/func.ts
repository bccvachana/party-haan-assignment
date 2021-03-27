import store from 'store';
import {
  setUserAction,
} from './actions';
import { IUserStore } from './types';

export const setUser = (user: IUserStore) => {
  store.dispatch(setUserAction(user));
};

export const clearUser = () => {
  store.dispatch(setUserAction(null));
};
