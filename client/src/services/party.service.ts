import {
  compose, flatten, get, getOr, partition,
} from 'lodash/fp';
import { ICreatePartyInput, IJoinPartyInput, IParty } from 'types/party.type';
import { axiosInstance } from 'utils/axios';
import store, { IRootStore } from 'store';

const find = async (): Promise<IParty[]> => {
  const { user }: IRootStore = await store.getState();
  const userId = get('id', user);
  const partyResult = await axiosInstance.get('/party');
  return compose(
    flatten,
    partition((party: IParty) => party.createdBy === userId),
    (result) => getOr([], 'data.data', result),
  )(partyResult);
};

const create = async (
  createPartyValue: ICreatePartyInput,
): Promise<void> => {
  await axiosInstance.post(
    '/party/create',
    createPartyValue,
  );
};

const join = async (
  joinPartyValue: IJoinPartyInput,
): Promise<void> => {
  await axiosInstance.post(
    '/party/join',
    joinPartyValue,
  );
};

export default {
  find,
  create,
  join,
};
