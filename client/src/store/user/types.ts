export interface IUserStore {
  email?: string;
  id?: number;
}

export type TUserStore = IUserStore | null;
