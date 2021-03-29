import { ICommonObject } from 'types/common.type';

export interface IUserStore {
  email?: string;
  id?: number;
  paticipatedParty?: ICommonObject;
}

export type TUserStore = IUserStore | Record<string, never> | null;
