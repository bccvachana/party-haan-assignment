import { useEffect } from 'react';
import { setHeader } from 'store/page/func';
import { IHeader } from 'store/page/types';

const useHeader = (header?: IHeader) => {
  useEffect(() => {
    setHeader(header);
  }, []);
};

export default useHeader;
