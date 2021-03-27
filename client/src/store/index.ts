import { combineReducers, createStore } from 'redux';
import { IPageStore } from './page/types';
import pageReducer from './page/reducer';
import { TUserStore } from './user/types';
import userReducer from './user/reducer';

export interface IRootStore {
  page: IPageStore;
  user: TUserStore;
}

const stores = createStore<IRootStore, any, any, any>(
  combineReducers({
    page: pageReducer,
    user: userReducer,
  }),
);

export default stores;
