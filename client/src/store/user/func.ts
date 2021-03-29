import store from 'store';
import { ICommonObject } from 'types/common.type';
import {
  setUserAction,
  setPaticipatedPartyAction,
} from './actions';
import { TUserStore } from './types';

export const setUser = (user: TUserStore) => {
  store.dispatch(
    setUserAction(user),
  );
};

export const setParticipatedParty = (
  paticipatedParty: ICommonObject,
) => {
  store.dispatch(
    setPaticipatedPartyAction(paticipatedParty),
  );
};
