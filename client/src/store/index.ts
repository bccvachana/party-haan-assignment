import { combineReducers, createStore } from 'redux';
import { IPageStore } from './page/types';
import pageReducer from './page/reducer';

export interface IRootStore {
  page: IPageStore;
}

const stores = createStore<IRootStore, any, any, any>(
  combineReducers({
    page: pageReducer,
  }),
);

export default stores;
