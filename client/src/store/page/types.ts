export interface IHeader {
  title?: string;
  noBackButton?: boolean;
  noLogoutButton?: boolean;
  noHeader?: boolean;
}

export type THeader = IHeader | undefined;

export interface IPageStore {
  header: IHeader;
}
