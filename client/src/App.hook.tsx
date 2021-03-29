import { useEffect } from 'react';
import userService from 'services/user.service';
import { setIsPageLoading } from 'store/page/func';
import { TNotReturnFunction } from 'types/common.type';
import { delayFunc } from 'utils/func';

export const useApp: TNotReturnFunction = () => {
  useEffect(() => {
    (async () => {
      await userService.auth();
      await delayFunc(1000);
      setIsPageLoading(false);
    })();
  }, []);
};
