import { useSelector } from 'react-redux';
import { IRootStore } from 'store';
import { IPageStore } from 'store/page/types';

const usePage = (): IPageStore => useSelector((state: IRootStore) => state.page);

export default usePage;
