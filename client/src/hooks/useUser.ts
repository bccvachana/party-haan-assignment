import { useSelector } from 'react-redux';
import { IRootStore } from 'store';
import { TUserStore } from 'store/user/types';

const useUser = (): TUserStore => useSelector((state: IRootStore) => state.user);

export default useUser;
