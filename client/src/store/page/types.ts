import { TNotReturnFunction } from 'types/common.type';

export interface IHeader {
  title?: string;
  noBackButton?: boolean;
  noLogoutButton?: boolean;
  noHeader?: boolean;
}

export type THeader = IHeader | undefined;

export interface IModal {
  isModal?: boolean;
  type?: 'info' | 'error';
  text?: string;
  okText?: string;
  cancelText?: string;
  isCancel?: boolean;
  onOk?: TNotReturnFunction;
  onCancal?: TNotReturnFunction;
}

export type TModal = IModal | undefined;

export interface IPageStore {
  header: THeader;
  modal: IModal;
  isPageLoading: boolean;
}
