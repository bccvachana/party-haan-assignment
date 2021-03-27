import { setModal } from 'store/page/func';
import { TModal } from 'store/page/types';
import store, { IRootStore } from 'store';

export const openModal = (modal: TModal): void => {
  setModal({
    isModal: true,
    ...modal,
  });
};

export const closeModal = async (): Promise<void> => {
  const {
    page: { modal },
  }: IRootStore = await store.getState();
  setModal({
    ...modal,
    isModal: false,
  });
};
